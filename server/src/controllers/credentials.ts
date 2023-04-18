import { Request, Response } from "express";
import GetCredentialsUsecase from "../usecases/getCredentials";

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
    } catch (error: any) {
      return res.status(400).json({ msg: error.message });
    }
  }
}

export const credentialsController = new CredentialsController();
