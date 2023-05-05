import { Axios, ResponseType } from "axios";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import { Builder, WebDriver } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { Pages, UNIP_BASE_URL } from "../../../entities/pages";
import { AxiosInstance } from "../axios";
import VideoDownloaderService from "../scripts/video-downloader/videoDownloader";
import URL from "./../../../entities/URL";

type LinkType =
  | "planoDeEnsino"
  | "questionario"
  | "atividade"
  | "videoaula"
  | "avaliacao"
  | "textoComplementar";

export interface CoursePageLink {
  url: string;
  type?: LinkType;
}

export default class GetPdfLinksUsecase {
  constructor() {}

  private courseId!: string;
  private dirPath!: string;

  public async execute(courseId: string): Promise<CoursePageLink[]> {
    this.courseId = courseId;
    const pageURL = Pages.COURSE_PAGE + courseId;
    const coursePage = await AxiosInstance.get(pageURL);
    const $ = cheerio.load(coursePage.data);
    const links = await this.getCoursePageLinks($);
    this.createDonwloadDirectory();
    for await (let link of links) this.downloadContent(link);
    return links;
  }

  private createDonwloadDirectory() {
    const publicDirPath = "../../../public/downloads/";
    const dirPath = path.join(__dirname, publicDirPath, `${this.courseId}`);
    fs.mkdir(dirPath, (err) => {
      if (err) throw new Error("Erro ao criar o diretorio");
      console.log(`O diretório '${dirPath}' foi criado com sucesso.`);
      this.dirPath = dirPath;
    });
  }

  private async downloadContent(link: CoursePageLink): Promise<void> {
    switch (link.type) {
      case "atividade":
        this.downloadPDF(link.url);
        break;
      case "videoaula":
        this.downloadVideo(link.url);
        break;
    }
  }

  private async downloadPDF(url: string) {
    try {
      const pdfData = await this.getPdfData(url);
      const fileName = await this.getPdfName(pdfData);
      const filePath = path.join(this.dirPath, `${fileName}.pdf`);
      fs.writeFileSync(filePath, pdfData, "binary");
    } catch (error: any) {
      console.log(`Failed to download PDF at ${url}: ${error.message}`);
    }
  }

  private async downloadVideo(url: string) {
    const videoDownloader = new VideoDownloaderService();
    videoDownloader.download(new URL(url), "teste");
  }

  private async getCoursePageLinks($: cheerio.Root): Promise<CoursePageLink[]> {
    return [
      ...new Set(
        $("a")
          .toArray()
          .map((e: any) => e.attribs.href)
          .filter((e: string) => e.startsWith(UNIP_BASE_URL))
      ),
    ].map((url: string) => {
      const type = this.inferLinkType(url);
      return { url, type };
    });
  }

  private inferLinkType(url: string): LinkType {
    return url.includes("player.jsp") ? "videoaula" : "atividade";
  }

  private async getPdfData(link: string) {
    const options = { responseType: "arraybuffer" as ResponseType };
    const response = await AxiosInstance.get(link, options);
    return response.data;
  }

  private async getPdfName(pdfData: Buffer): Promise<string> {
    const parsedPdf = await pdfParse(pdfData);
    const fileName = parsedPdf.info.Title;
    return (fileName + "_").replace(" ", "_") + Math.random();
  }
}
