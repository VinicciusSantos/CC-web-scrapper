import { Request, Response } from "express";
import GetCoursesUsecase from "../usecases/getCourses";
import GetGradesFromCourseUsecase from "../usecases/getGradesFromCourse";

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
}

export const coursesController = new CoursesController();
