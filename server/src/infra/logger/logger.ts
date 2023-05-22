export interface Logger {
  success(message: string): void;
  error(message: string): void;
}
