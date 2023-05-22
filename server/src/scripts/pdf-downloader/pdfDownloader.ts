import { ResponseType } from "axios";
import fs from "fs";
import path from "path";

import { AxiosInstance } from "../../infra/http/axios";
import { Logger } from "../../infra/logger/logger";

export default class PdfDownloaderService {
  constructor(private logger: Logger) {}

  public async download(
    url: string,
    fileName: string,
    folderPath: string
  ): Promise<string> {
    const pdfData = await this.getPdfData(url);
    const filePath = path.join(folderPath, `${fileName}.pdf`);
    fs.writeFileSync(filePath, pdfData, "binary");
    this.logger.success(`Download de ${fileName} concluido`);
    return fileName;
  }

  private async getPdfData(link: string) {
    const options = { responseType: "arraybuffer" as ResponseType };
    const response = await AxiosInstance.get(link, options);
    return response.data;
  }
}
