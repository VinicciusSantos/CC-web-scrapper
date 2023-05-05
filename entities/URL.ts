export default class URL {
  constructor(public url: string) {}

  public extractParam(paramName: string): string {
    const start = this.url.indexOf(`${paramName}=`) + paramName.length + 1;
    const end = this.url.indexOf("&", start);
    return this.url.substring(start, end !== -1 ? end : undefined);
  }
}
