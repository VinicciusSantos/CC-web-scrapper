import fs from "fs";
import path from "path";
import { AxiosInstance } from "../../infra/http/axios";

export default class PageDownloaderService {
  constructor() {}

  public async download(url: string, folderPath: string): Promise<void> {
    const page = await AxiosInstance.get(url);
    const filePath = path.join(folderPath, `teste${Math.random()}.html`);
    fs.writeFileSync(filePath, page.data);
  }
}
