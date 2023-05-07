import { Request, Response } from "express";
import GetCredentialsUsecase from "../usecases/getCredentials";
import errorHandler from "../application/errors/errorHandler";

class CredentialsController {
  public async getCredentials(req: Request, res: Response) {
    try {
      const { userId, password } = req.body;
      const credentials = await new GetCredentialsUsecase().execute(
        userId,
        password
      );
      res.cookie("credentials", credentials);
      return res.status(204).end();
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}

export const credentialsController = new CredentialsController();
