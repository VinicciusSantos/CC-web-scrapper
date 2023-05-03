import { ResponseType } from "axios";
import { Pages, UNIP_BASE_URL } from "../../../entities/pages";
import { AxiosInstance } from "../axios";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

type LinkType =
  | "planoDeEnsino"
  | "questionario"
  | "atividade"
  | "videoaula"
  | "avaliacao"
  | "textoComplementar";

export interface CoursePageLink {
  url: string;
  type?: LinkType;
}

export default class GetPdfLinksUsecase {
  constructor() {}

  public async execute(courseId: string): Promise<CoursePageLink[]> {
    const pageURL = Pages.COURSE_PAGE + courseId;
    const coursePage = await AxiosInstance.get(pageURL);
    const $ = cheerio.load(coursePage.data);
    const links = await this.getCoursePageLinks($);
    for await (let link of links) this.downloadOne(link);
    return links;
  }

  private async downloadOne(link: CoursePageLink): Promise<void> {
    if (link.type === "atividade") {
      try {
        const pdfData = await this.getPdfData(link.url);
        return this.savePdf(pdfData);
      } catch (error: any) {
        console.log(`Failed to download PDF at ${link.url}: ${error.message}`);
      }
    }
  }

  private async getCoursePageLinks($: cheerio.Root): Promise<CoursePageLink[]> {
    return [
      ...new Set(
        $("a")
          .toArray()
          .map((e: any) => e.attribs.href)
          .filter((e: string) => e.startsWith(UNIP_BASE_URL))
      ),
    ].map((url: string) => {
      const type = this.inferLinkType(url);
      return { url, type };
    });
  }

  private inferLinkType(url: string): LinkType {
    return url.includes("player.jsp") ? "videoaula" : "atividade";
  }

  private async getPdfData(link: string) {
    const options = { responseType: "arraybuffer" as ResponseType };
    const response = await AxiosInstance.get(link, options);
    return response.data;
  }

  private async savePdf(pdfData: Buffer): Promise<void> {
    const fileName = await this.getPdfName(pdfData);
    const filePath = path.join(__dirname, "downloads", `${fileName}.pdf`);
    fs.writeFileSync(filePath, pdfData, "binary");
  }

  private async getPdfName(pdfData: Buffer): Promise<string> {
    const parsedPdf = await pdfParse(pdfData);
    const fileName = parsedPdf.info.Title;
    return (fileName + "_").replace(" ", "_") + Math.random();
  }
}
