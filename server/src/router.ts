import { Router } from "express";
import { coursesController } from "./controllers/courses";
import { credentialsController } from "./controllers/credentials";
import cookieSetterMiddleware from "./middlewares/cookieSetter";

const router: Router = Router();

router.get("/courses", cookieSetterMiddleware, coursesController.getCourses);
router.get("/courses/:id/grades", cookieSetterMiddleware, coursesController.getGrades);
router.post("/credentials", credentialsController.getCredentials);

export { router };
