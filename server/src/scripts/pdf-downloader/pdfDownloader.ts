import { ResponseType } from "axios";
import fs, { PathLike } from "fs";
import path from "path";
import pdfParse from "pdf-parse";

import { AxiosInstance } from "../../infra/http/axios";

export default class PdfDownloader {
  constructor() {}

  public async download(url: string, folderPath: string): Promise<void> {
    try {
      const pdfData = await this.getPdfData(url);
      const fileName = await this.getPdfName(pdfData);
      const filePath = path.join(folderPath, `${fileName}.pdf`);
      fs.writeFileSync(filePath, pdfData, "binary");
    } catch (error: any) {
      console.log(`Failed to download PDF at ${url}: ${error.message}`);
    }
  }

  private async getPdfData(link: string) {
    const options = { responseType: "arraybuffer" as ResponseType };
    const response = await AxiosInstance.get(link, options);
    return response.data;
  }

  private async getPdfName(pdfData: Buffer): Promise<string> {
    const parsedPdf = await pdfParse(pdfData);
    const fileName = parsedPdf.info.Title;
    return (fileName + "_").replace(" ", "_") + Math.random();
  }
}
