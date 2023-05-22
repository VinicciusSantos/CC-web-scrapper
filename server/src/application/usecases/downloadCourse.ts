import fs from "fs";
import path from "path";

import Course from "../../../../entities/courses";
import PdfDownloaderService from "../../scripts/pdf-downloader/pdfDownloader";
import VideoDownloaderService from "../../scripts/video-downloader/videoDownloader";
import DownloadQuestionarioUsecase from "./downloadQuestionario";
import GetCourseByIdUsecase from "./getCourseById";
import GetCourseLinksUsecase, { CoursePageLink } from "./getCourseLinks";
import { Logger } from "../../infra/logger/logger";

export default class DownloadCourseUsecase {
  private getCourseLinksUsecase = new GetCourseLinksUsecase();
  private getCourseByIdUsecase = new GetCourseByIdUsecase();
  private downloadQuestionarioUsecase: DownloadQuestionarioUsecase;
  private pdfDownloader: PdfDownloaderService;
  private videoDownloader: VideoDownloaderService;
  private courseInfos!: Course;
  private dirPath!: string;
  private downloadsDirPath = path.join(
    __dirname,
    "../../../../public/downloads/"
  );

  constructor(private logger: Logger) {
    this.downloadQuestionarioUsecase = new DownloadQuestionarioUsecase(logger);
    this.pdfDownloader = new PdfDownloaderService(logger);
    this.videoDownloader = new VideoDownloaderService(logger);
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
    this.logger.success(`O curso ${this.courseInfos.name} foi baixado`);
  }

  private createDonwloadDirectory() {
    const newDirName = this.courseInfos.name.replace(/ /g, "_");
    this.dirPath = path.join(this.downloadsDirPath, newDirName);
    fs.mkdir(this.dirPath, (err) => {
      if (err) throw new Error("Erro ao criar o diretorio");
      this.logger.success(`O diretório '${newDirName}' foi criado`);
    });
  }

  private async downloadContent(link: CoursePageLink): Promise<void> {
    if (link.format === "PDF") {
      await this.pdfDownloader.download(link.url, link.name, this.dirPath);
    }
    if (link.format === "HTML") {
      await this.downloadQuestionarioUsecase.execute(
        link.url,
        link.name,
        this.dirPath
      );
    }
    if (link.format === "MP4") {
      await this.videoDownloader.download(link.url, link.name, this.dirPath);
    }
    // throw new Error("Not Implemented!");
  }
}
