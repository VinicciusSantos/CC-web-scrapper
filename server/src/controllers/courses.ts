import { Request, Response } from 'express';

import errorHandler from '../application/errors/errorHandler';
import GetCoursesUsecase from '../usecases/getCourses';
import GetGradesFromCourseUsecase from '../usecases/getGradesFromCourse';
import GetPdfLinksUsecase from '../usecases/getPdfLinks';

class CoursesController {
  public async getCourses(_req: Request, res: Response) {
    try {
      const courses = await new GetCoursesUsecase().execute();
      return res.json({
        msg: `returning ${courses.length} courses with success`,
        data: { courses },
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  public async getGrades(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const grades = await new GetGradesFromCourseUsecase().execute(id);
      return res.json({
        msg: `returning grades from course ${id}`,
        data: { grades },
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  public async downloadData(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const links = await new GetPdfLinksUsecase().execute(id);
      return res.json({
        msg: "done",
        data: { links },
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}

export const coursesController = new CoursesController();
