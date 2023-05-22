import fs from "fs";
import path from "path";
import { AxiosInstance } from "../../infra/http/axios";
import { Logger } from "../../infra/logger/logger";

export default class PageDownloaderService {
  constructor(private logger: Logger) {}

  public async download(
    url: string,
    fileName: string,
    folderPath: string
  ): Promise<void> {
    const page = await AxiosInstance.get(url);
    const filePath = path.join(folderPath, `${fileName}.html`);
    fs.writeFileSync(filePath, page.data);
    this.logger.success(`Downloaad de ${fileName} concluido`);
  }
}
