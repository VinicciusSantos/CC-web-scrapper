import { Application, Router } from "express";
import credentialsRouter from "./credentialsRouter";
import CourseRouter from "./courseRouter";

export default class RouterConfig {
  constructor(app: Application) {
    const router: Router = Router();
    new CourseRouter(router);
    new credentialsRouter(router);
    app.use(router);
  }
}
