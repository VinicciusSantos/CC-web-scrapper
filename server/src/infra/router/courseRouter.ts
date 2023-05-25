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
      coursesController.getCourses
    );
    router.get(
      "/courses/:id/grades",
      cookieSetterMiddleware,
      coursesController.getGrades
    );
    router.get(
      "/courses/:id/links",
      cookieSetterMiddleware,
      coursesController.getCourseLinks
    );
    router.post(
      "/courses/:id/download",
      cookieSetterMiddleware,
      coursesController.downloadData
    );
  }
}
