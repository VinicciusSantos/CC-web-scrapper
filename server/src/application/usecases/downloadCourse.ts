import cheerio from "cheerio";
import fs from "fs";
import path from "path";

import { Pages, UNIP_BASE_URL } from "../../../../entities/pages";
import URL from "../../../../entities/URL";
import { AxiosInstance } from "../../infra/http/axios";
import PdfDownloader from "../../scripts/pdf-downloader/pdfDownloader";
import VideoDownloaderService from "../../scripts/video-downloader/videoDownloader";

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

export default class DownloadCourseUsecase {
  constructor() {}

  private downloadsDirPath = path.join(
    __dirname,
    "../../../../public/downloads/"
  );
  private dirPath!: string;
  private courseName!: string;

  public async execute(courseId: string): Promise<void> {
    const pageURL = Pages.COURSE_PAGE + courseId;
    const coursePage = await AxiosInstance.get(pageURL);
    const $ = cheerio.load(coursePage.data);
    const links = await this.getCoursePageLinks($);
    this.courseName = $("span.courseName").text().replace(/ /g, "_");
    this.createDonwloadDirectory();
    await Promise.allSettled(
      links.map(async (link) => {
        await this.downloadContent(link);
      })
    );
  }

  private createDonwloadDirectory() {
    this.dirPath = path.join(this.downloadsDirPath, this.courseName);
    fs.mkdir(this.dirPath, (err) => {
      if (err) throw new Error("Erro ao criar o diretorio");
      console.log(`>>> O diretório '${this.dirPath}' foi criado com sucesso.`);
    });
  }

  private async downloadContent(link: CoursePageLink): Promise<string> {
    switch (link.type) {
      case "atividade":
        return this.downloadPDF(link.url);
      case "videoaula":
        return this.downloadVideo(link.url);
      default:
        throw new Error("Not Implemented!");
    }
  }

  private async downloadPDF(url: string): Promise<string> {
    return new PdfDownloader().download(url, this.dirPath);
  }

  private async downloadVideo(url: string): Promise<string> {
    return new VideoDownloaderService().download(new URL(url), this.dirPath);
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
