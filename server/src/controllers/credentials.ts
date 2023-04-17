import { Request, Response } from "express";
import GetCredentialsUsecase from "../usecases/getCredentials";

class CredentialsController {
  public async getCredentials(req: Request, res: Response) {
    const { userId, password } = req.body;
    const credentials = await new GetCredentialsUsecase().execute(
      userId,
      password
    );
    res.cookie("credentials", credentials);
    return res.status(204).end()
  }
}

export const credentialsController = new CredentialsController();
