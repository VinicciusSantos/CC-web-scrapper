import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import RouterConfig from "./infra/router";

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    new RouterConfig(this.server);
  }

  private middleware() {
    this.server.use(
      cors({
        credentials: true,
        origin: "http://localhost:4200",
      })
    );
    this.server.use(express.json());
    this.server.use(cookieParser());
  }
}
