import { Logger } from "./logger";

export default class ConsoleLogger implements Logger {
  public success(message: string): void {
    this.log(message, "\x1b[42m\x1b[37m\x1b[1m");
  }

  public error(message: string): void {
    this.log(message, "\x1b[41m\x1b[37m\x1b[1m");
  }

  private log(message: string, colorCode: string): void {
    const defaultColor = "\x1b[0m";
    const today = new Date().toISOString();
    console.log(`${colorCode} >>> ${message} at ${today}! ${defaultColor}`);
  }
}
