import { Router } from "express";
import { coursesController } from "./controllers/courses";
import { credentialsController } from "./controllers/credentials";

const router: Router = Router();

router.get("/courses", coursesController.getCourses);
router.post("/credentials", credentialsController.getCredentials);

export { router };
