import fs from "fs";
import path from "path";

import URL from "../../../../entities/URL";
import VideoDownloaderService from "../../scripts/video-downloader/videoDownloader";
import GetCourseLinksUsecase, { CoursePageLink } from "./getCourseLinks";
import PdfDownloaderService from "../../scripts/pdf-downloader/pdfDownloader";
import GetCourseByIdUsecase from "./getCourseById";
import Course from "../../../../entities/courses";

export default class DownloadCourseUsecase {
  private getCourseLinksUsecase: GetCourseLinksUsecase;
  private getCourseByIdUsecase: GetCourseByIdUsecase;
  private pdfDownloader: PdfDownloaderService;
  private videoDownloader: VideoDownloaderService;
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
  }

  private createDonwloadDirectory() {
    this.dirPath = path.join(this.downloadsDirPath, this.courseInfos.name);
    fs.mkdir(this.dirPath, (err) => {
      if (err) throw new Error("Erro ao criar o diretorio");
      console.log(`>>> O diretório '${this.dirPath}' foi criado com sucesso.`);
    });
  }

  private async downloadContent(link: CoursePageLink): Promise<string> {
    switch (link.type) {
      case "atividade":
        return this.pdfDownloader.download(link.url, this.dirPath);
      case "videoaula":
        return this.videoDownloader.download(new URL(link.url), this.dirPath);
      default:
        throw new Error("Not Implemented!");
    }
  }
}
