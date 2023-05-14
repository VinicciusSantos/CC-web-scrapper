import fs from "fs";
import path from "path";

import URL from "../../../../entities/URL";
import VideoDownloaderService from "../../scripts/video-downloader/videoDownloader";
import GetCourseLinksUsecase, {
  CoursePageLink,
  LinkType,
} from "./getCourseLinks";
import PdfDownloaderService from "../../scripts/pdf-downloader/pdfDownloader";
import GetCourseByIdUsecase from "./getCourseById";
import Course from "../../../../entities/courses";
import PageDownloaderService from "../../scripts/page-downloader/pageDownloader";

export default class DownloadCourseUsecase {
  private getCourseLinksUsecase: GetCourseLinksUsecase;
  private getCourseByIdUsecase: GetCourseByIdUsecase;
  private pdfDownloader: PdfDownloaderService;
  private videoDownloader: VideoDownloaderService;
  private pageDownloader: PageDownloaderService;
  private courseInfos!: Course;
  private dirPath!: string;
  private downloadsDirPath = path.join(
    __dirname,
    "../../../../public/downloads/"
  );

  constructor() {
    this.getCourseLinksUsecase = new GetCourseLinksUsecase();
    this.getCourseByIdUsecase = new GetCourseByIdUsecase();
    this.pdfDownloader = new PdfDownloaderService();
    this.videoDownloader = new VideoDownloaderService();
    this.pageDownloader = new PageDownloaderService();
  }

  public async execute(courseId: string): Promise<void> {
    this.courseInfos = await this.getCourseByIdUsecase.execute(courseId);
    const links = await this.getCourseLinksUsecase.execute(courseId);
    this.createDonwloadDirectory();
    await Promise.allSettled(
      links.map(async (link) => {
        await this.downloadContent(link);
      })
    );
    console.log(`>>> O curso ${this.courseInfos.name} foi baixado com sucesso`);
  }

  private createDonwloadDirectory() {
    this.dirPath = path.join(
      this.downloadsDirPath,
      this.courseInfos.name.replace(/ /g, "_")
    );
    fs.mkdir(this.dirPath, (err) => {
      if (err) throw new Error("Erro ao criar o diretorio");
      console.log(`>>> O diretório '${this.dirPath}' foi criado com sucesso.`);
    });
  }

  private async downloadContent(link: CoursePageLink): Promise<void> {
    const isPage = ["QUESTIONARIO", "ATIVIDADE"].includes(link.type);
    const isPDF = [
      "PLANO DE ENSINO",
      "SLIDE",
      "LIVRO TEXTO",
      "TEXTO COMPLEMENTAR",
    ].includes(link.type);
    if (isPDF) {
      // await this.pdfDownloader.download(link.url, this.dirPath);
    }
    if (isPage) {
      await this.pageDownloader.download(link.url, this.dirPath);
    }
    if (link.type === "VIDEOAULA") {
      // await this.videoDownloader.download(link.url, this.dirPath);
    }
    // throw new Error("Not Implemented!");
  }
}
