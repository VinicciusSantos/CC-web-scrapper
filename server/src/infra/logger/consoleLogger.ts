import { Logger } from "./logger";

export default class ConsoleLogger implements Logger {
  public success(message: string): void {
    this.log(message, "\x1b[32m");
  }

  public error(message: string): void {
    this.log(message, "\x1b[31m");
  }

  public info(message: string): void {
    this.log(message, "\x1b[34m");
  }

  private log(message: string, colorCode: string): void {
    const defaultColor = "\x1b[0m";
    const today = new Date().toISOString();
    console.log(`${colorCode}[app] ${message}! ${defaultColor}`);
  }
}
