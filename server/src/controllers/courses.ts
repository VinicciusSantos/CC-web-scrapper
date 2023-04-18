import { Request, Response } from "express";
import GetCoursesUsecase from "../usecases/getCourses";

class CoursesController {
  public async getCourses(req: Request, res: Response) {
    const courses = await new GetCoursesUsecase().execute();
    return res.json({
      msg: "done",
      data: { courses },
    });
  }
}

export const coursesController = new CoursesController();
