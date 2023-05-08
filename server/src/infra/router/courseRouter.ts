import { Router } from "express";
import CoursesController from "../../controllers/courses";
import cookieSetterMiddleware from "../../middlewares/cookieSetter";

export default class CourseRouter {
  constructor(router: Router) {
    const coursesController = new CoursesController();

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
      "/courses/:id/download",
      cookieSetterMiddleware,
      coursesController.downloadData
    );
  }
}
