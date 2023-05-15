import { ResponseType } from "axios";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

import { AxiosInstance } from "../../infra/http/axios";

export default class PdfDownloaderService {
  constructor() {}

  public async download(
    url: string,
    fileName: string,
    folderPath: string
  ): Promise<string> {
    const pdfData = await this.getPdfData(url);
    const filePath = path.join(folderPath, `${fileName}.pdf`);
    fs.writeFileSync(filePath, pdfData, "binary");
    console.log(`>>> Download de ${fileName} concluido!`);
    return fileName;
  }

  private async getPdfData(link: string) {
    const options = { responseType: "arraybuffer" as ResponseType };
    const response = await AxiosInstance.get(link, options);
    return response.data;
  }
}
