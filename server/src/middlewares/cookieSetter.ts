import { Request, Response, NextFunction } from "express";
import { AxiosInstance } from "../axios";

const cookieSetterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const credentials = req.cookies["credentials"];
  if (!credentials)
    return res.status(401).json({
      msg: "Faça Login para Continuar!",
    });
  AxiosInstance.defaults.headers.common["Cookie"] = credentials;
  return next();
};

export default cookieSetterMiddleware;
