import { AxiosInstance } from "../../infra/http/axios";
import cheerio from "cheerio";

import { Pages, UNIP_BASE_URL } from "../../../../entities/pages";

export type LinkType =
  | "PLANO DE ENSINO"
  | "SLIDE"
  | "VIDEOAULA"
  | "LIVRO TEXTO"
  | "TEXTO COMPLEMENTAR"
  | "OUTROS";

export interface CoursePageLink {
  url: string;
  type: LinkType;
}

export default class GetCourseLinksUsecase {
  constructor() {}

  public async execute(courseId: string): Promise<CoursePageLink[]> {
    const pageURL = Pages.COURSE_PAGE + courseId;
    const coursePage = await AxiosInstance.get(pageURL);
    const $ = cheerio.load(coursePage.data);
    const links = this.extractLinksFromPage($);
    return links;
  }

  private extractLinksFromPage($: cheerio.Root): CoursePageLink[] {
    const links: CoursePageLink[] = [];

    $("a")
      .toArray()
      .filter(this.isInternalUniPLink)
      .filter((e) => this.isNotImageLink($, e))
      .forEach((link: any) => {
        const title = $(link).text().trim();
        const url = link.attribs.href;
        const type = this.inferLinkType(title, url);
        links.push({ url, type });
      });

    return links;
  }

  private isInternalUniPLink(link: any): boolean {
    return link.attribs.href.startsWith(UNIP_BASE_URL);
  }

  private isNotImageLink($: cheerio.Root, link: any): boolean {
    return !$(link).html()!.includes("<img");
  }

  private inferLinkType(title: string, url: string): LinkType {
    if (title.includes("PLANO")) return "PLANO DE ENSINO";
    if (title.includes("SLIDES")) return "SLIDE";
    if (title.includes("VIDEOAULA") || url.includes("player.jsp"))
      return "VIDEOAULA";
    if (title.includes("LIVRO-TEXTO")) return "LIVRO TEXTO";
    if (title.includes("COMPLEMENTAR")) return "TEXTO COMPLEMENTAR";
    return "OUTROS";
  }
}
