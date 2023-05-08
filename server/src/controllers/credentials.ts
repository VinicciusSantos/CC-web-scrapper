import { Request, Response } from "express";
import GetCredentialsUsecase from "../application/usecases/getCredentials";
import errorHandler from "../application/errors/errorHandler";

export default class CredentialsController {
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
