import { Response } from "express";
import GenericError from "./genericError";

export default function errorHandler(res: Response, error: any) {
  if (error instanceof GenericError) {
    const { msg } = error;
    return res.status(error.statusCode).json({ msg });
  }
  return res.status(400).json({ msg: error });
}
