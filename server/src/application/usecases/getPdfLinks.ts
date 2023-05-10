import cheerio from "cheerio";
import fs, { PathLike } from "fs";
import path from "path";

import { Pages, UNIP_BASE_URL } from "../../../../entities/pages";
import URL from "../../../../entities/URL";
import { AxiosInstance } from "../../infra/http/axios";
import VideoDownloaderService from "../../scripts/video-downloader/videoDownloader";
import PdfDownloader from "../../scripts/pdf-downloader/pdfDownloader";

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
  private courseName!: string;

  public async execute(courseId: string): Promise<CoursePageLink[]> {
    this.courseId = courseId;
    const pageURL = Pages.COURSE_PAGE + courseId;
    const coursePage = await AxiosInstance.get(pageURL);
    const $ = cheerio.load(coursePage.data);
    const links = await this.getCoursePageLinks($);
    this.courseName = $("span.courseName").text().replace(/ /g, "_");
    this.createDonwloadDirectory();
    for await (let link of links) this.downloadContent(link);
    return links;
  }

  private createDonwloadDirectory() {
    const downloadsDirPath = "../../../../public/downloads/";
    const dirPath = path.join(__dirname, downloadsDirPath, this.courseName);
    fs.mkdir(dirPath, (err) => {
      if (err) throw new Error("Erro ao criar o diretorio");
      console.log(`>>> O diretório '${dirPath}' foi criado com sucesso.`);
    });
    this.dirPath = dirPath;
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
    const pdfDownloader = new PdfDownloader();
    pdfDownloader.download(url, this.dirPath);
  }

  private async downloadVideo(url: string) {
    const videoDownloader = new VideoDownloaderService();
    videoDownloader.download(new URL(url), this.dirPath);
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
}
