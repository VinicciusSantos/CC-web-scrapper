import { Request, Response } from "express";

import errorHandler from "../application/errors/errorHandler";
import GetCoursesUsecase from "../application/usecases/getCourses";
import GetGradesFromCourseUsecase from "../application/usecases/getGradesFromCourse";
import DownloadCourseUsecase from "../application/usecases/downloadCourse";
import { Logger } from "../infra/logger/logger";

export default class CoursesController {
  private getCoursesUsecase = new GetCoursesUsecase();
  private getGradesFromCourseUsecase = new GetGradesFromCourseUsecase();
  private downloadCourseUsecase: DownloadCourseUsecase;

  constructor(private logger: Logger) {
    this.downloadCourseUsecase = new DownloadCourseUsecase(this.logger);
  }

  public getCourses = async (_req: Request, res: Response) => { 
    try {
      const courses = await this.getCoursesUsecase.execute();
      return res.json({
        msg: `returning ${courses.length} courses with success`,
        data: { courses },
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  public getGrades = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const grades = await this.getGradesFromCourseUsecase.execute(id);
      return res.json({
        msg: `returning grades from course ${id}`,
        data: { grades },
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  public downloadData = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.downloadCourseUsecase.execute(id);
      return res.status(200).json({ msg: "Download completed!" });
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}
