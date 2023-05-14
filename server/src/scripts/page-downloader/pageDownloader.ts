import { AxiosInstance } from "../../infra/http/axios";
import cheerio from "cheerio";
import path from "path";
import fs from "fs";
const pdfMake = require("pdfmake");

export default class PageDownloaderService {
  constructor() {}

  public async download(url: string, folderPath: string): Promise<void> {
    const page = await AxiosInstance.get(url);
    const $ = cheerio.load(page.data);
    const htmlString = $.html();
    const filePath = path.join(folderPath, `teste${Math.random()}.html`);
    fs.writeFileSync(filePath, htmlString);
  }
}
