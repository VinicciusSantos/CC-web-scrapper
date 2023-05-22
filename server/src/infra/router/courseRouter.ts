import { Router } from "express";
import CoursesController from "../../controllers/courses";
import cookieSetterMiddleware from "../../middlewares/cookieSetter";
import { Logger } from "../logger/logger";

export default class CourseRouter {
  constructor(router: Router, logger: Logger) {
    const coursesController = new CoursesController(logger);

    router.get(
      "/courses",
      cookieSetterMiddleware,
      coursesController.getCourses.bind(logger)
    );
    router.get(
      "/courses/:id/grades",
      cookieSetterMiddleware,
      coursesController.getGrades.bind(logger)
    );
    router.get(
      "/courses/:id/download",
      cookieSetterMiddleware,
      coursesController.downloadData.bind(logger)
    );
  }
}
