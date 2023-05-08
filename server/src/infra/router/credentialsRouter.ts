import { Router } from "express";
import CredentialsController from "../../controllers/credentials";

export default class credentialsRouter {
  constructor(router: Router) {
    const credentialsController = new CredentialsController();

    router.post("/credentials", credentialsController.getCredentials);
  }
}
