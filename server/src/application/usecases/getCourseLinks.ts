import { AxiosInstance } from "../../infra/http/axios";
import cheerio from "cheerio";

import { Pages, UNIP_BASE_URL } from "../../../../entities/pages";

export type LinkType =
  | "PLANO DE ENSINO"
  | "SLIDE"
  | "VIDEOAULA"
  | "LIVRO TEXTO"
  | "TEXTO COMPLEMENTAR"
  | "QUESTIONARIO"
  | "ATIVIDADE"
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
    const links = await this.extractLinksFromPage($);
    return links;
  }

  private async extractLinksFromPage(
    $: cheerio.Root
  ): Promise<CoursePageLink[]> {
    const links = $("a")
      .toArray()
      .filter(this.isInternalUnipLink)
      .filter((e) => this.isNotImageLink($, e))
      .map((link: any) => {
        const title = $(link).text().trim();
        const url = link.attribs.href;
        const type = this.inferLinkType(title, url);
        return { url, type };
      })
      .map(this.replaceQuestLinks);
    return Promise.all(links);
  }

  private isInternalUnipLink(link: any): boolean {
    return (
      link.attribs.href.startsWith(UNIP_BASE_URL) ||
      link.attribs.href.startsWith(
        "/webapps/blackboard/content/launchAssessment.jsp?course_id="
      )
    );
  }

  private isNotImageLink($: cheerio.Root, link: any): boolean {
    return !$(link).html()!.includes("<img");
  }

  private inferLinkType(title: string, url: string): LinkType {
    if (url.includes("player.jsp")) return "VIDEOAULA";
    const searchDictionary: Record<string, LinkType> = {
      plano: "PLANO DE ENSINO",
      slides: "SLIDE",
      videoaula: "VIDEOAULA",
      livro: "LIVRO TEXTO",
      complementar: "TEXTO COMPLEMENTAR",
      question: "QUESTIONARIO",
      atividade: "ATIVIDADE",
    };
    for (let linktype of Object.entries(searchDictionary)) {
      if (title.toLowerCase().includes(linktype[0])) return linktype[1];
    }
    return "OUTROS";
  }

  private async replaceQuestLinks(
    course: CoursePageLink
  ): Promise<CoursePageLink> {
    const isQuestOrActiv = course.url.startsWith(
      "/webapps/blackboard/content/launchAssessment.jsp?course_id="
    );
    if (!isQuestOrActiv) return course;
    course.url = `https://ava.ead.unip.br${course.url}`
    const page = await AxiosInstance.get(course.url);
    const $ = cheerio.load(page.data);
    return course;
  }
}
