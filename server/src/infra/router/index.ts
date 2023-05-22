import { Application, Router } from "express";
import CourseRouter from "./courseRouter";
import { Logger } from "../logger/logger";
import CredentialsRouter from "./credentialsRouter";

export default class RouterConfig {
  constructor(app: Application, logger: Logger) {
    const router: Router = Router();
    new CourseRouter(router, logger);
    new CredentialsRouter(router);
    app.use(router);
  }
}
