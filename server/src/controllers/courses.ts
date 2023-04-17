import { Request, Response } from "express";
import GetCoursesUsecase from "../usecases/getCourses";
import { AxiosInstance } from "../axios";

class CoursesController {
  public async getCourses(req: Request, res: Response) {
    const str = req.headers.cookie;
    let str2 = "";
    if (str) {
      const credentialsIndex = str.indexOf("credentials=");
      if (credentialsIndex === -1) {
        str2 = "";
      } else {
        const startIndex = credentialsIndex + "credentials=".length;
        str2 = str.substring(startIndex);
      }
    }

    AxiosInstance.defaults.headers.common["Cookie"] = str2;

    const courses = await new GetCoursesUsecase().execute();
    return res.json({
      msg: "done",
      data: { courses },
    });
  }
}

export const coursesController = new CoursesController();
