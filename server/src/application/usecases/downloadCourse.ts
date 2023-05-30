import fs from "fs";
import path from "path";

import Course from "../../entities/courses";
import PdfDownloaderService from "../../scripts/pdf-downloader/pdfDownloader";
import VideoDownloaderService from "../../scripts/video-downloader/videoDownloader";
import DownloadQuestionarioUsecase from "./downloadQuestionario";
import GetCourseByIdUsecase from "./getCourseById";
import { Logger } from "../../infra/logger/logger";
import {
  CoursePageLink,
  GetCourseLinksOutput,
} from "../../entities/courseLinks";

export default class DownloadCourseUsecase {
  private getCourseByIdUsecase = new GetCourseByIdUsecase();
  private downloadQuestionarioUsecase: DownloadQuestionarioUsecase;
  private pdfDownloader: PdfDownloaderService;
  private videoDownloader: VideoDownloaderService;
  private courseInfos!: Course;
  private dirPath!: string;
  private downloadsDirPath = path.join(__dirname, "../../../public/downloads");

  constructor(private logger: Logger) {
    this.downloadQuestionarioUsecase = new DownloadQuestionarioUsecase(logger);
    this.pdfDownloader = new PdfDownloaderService(logger);
    this.videoDownloader = new VideoDownloaderService(logger);
  }

  public async execute(
    courseId: string,
    links: GetCourseLinksOutput
  ): Promise<void> {
    this.courseInfos = await this.getCourseByIdUsecase.execute(courseId);
    const unidades = Object.keys(links);
    await this.createDonwloadDirectory(unidades);
    for await (let u of unidades) {
      await Promise.all(
        links[u].map((link) => {
          const folderPath = path.join(this.dirPath, u.replace(/ /g, "_"));
          return this.downloadContent(link, folderPath);
        })
      );
    }
    this.logger.success(`O curso ${this.courseInfos.name} foi baixado`);
  }

  private async createDonwloadDirectory(unidades: string[]) {
    const newDirName = this.courseInfos.name;
    this.dirPath = path
      .join(this.downloadsDirPath, newDirName)
      .replace(/ /g, "_");
    await this.createFolder(newDirName, this.dirPath);
    for await (let folder of unidades) {
      const folderPath = path.join(this.dirPath, folder).replace(/ /g, "_");
      await this.createFolder(folder, folderPath);
    }
  }

  private async createFolder(
    folderName: string,
    dirPath: string
  ): Promise<void> {
    try {
      await fs.promises.mkdir(dirPath);
      this.logger.success(`O diretório '${folderName}' foi criado`);
    } catch (err) {
      throw new Error("Erro ao criar o diretório");
    }
  }

  private async downloadContent(
    link: CoursePageLink,
    folderPath: string
  ): Promise<void> {
    if (link.format === "PDF") {
      await this.pdfDownloader.download(link.url, link.name, folderPath);
    }
    if (link.format === "HTML") {
      await this.downloadQuestionarioUsecase.execute(
        link.url,
        link.name,
        folderPath
      );
    }
    if (link.format === "MP4") {
      await this.videoDownloader.download(link.url, link.name, folderPath);
    }
    // throw new Error("Not Implemented!");
  }
}
