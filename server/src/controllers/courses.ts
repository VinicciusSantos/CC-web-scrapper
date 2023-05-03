import { Request, Response } from "express";
import GetCoursesUsecase from "../usecases/getCourses";
import GetGradesFromCourseUsecase from "../usecases/getGradesFromCourse";
import GetPdfLinksUsecase from "../usecases/getPdfLinks";

class CoursesController {
  public async getCourses(_req: Request, res: Response) {
    const courses = await new GetCoursesUsecase().execute();
    return res.json({
      msg: "done",
      data: { courses },
    });
  }

  public async getGrades(req: Request, res: Response) {
    const { id } = req.params;
    const grades = await new GetGradesFromCourseUsecase().execute(id);
    return res.json({
      msg: "done",
      data: { grades },
    });
  }

  public async downloadData(req: Request, res: Response) {
    const { id } = req.params;
    const links = await new GetPdfLinksUsecase().execute(id);
    return res.json({
      msg: "done",
      data: { links },
    });
  }
}

export const coursesController = new CoursesController();
