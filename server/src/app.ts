import express from "express";
import { router } from "./router";
import cookieParser from 'cookie-parser';

export class App{
  public server: express.Application;

  constructor(){
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware(){
    this.server.use(express.json());
    this.server.use(cookieParser())
  }

  private router(){
    this.server.use(router);
  }
}