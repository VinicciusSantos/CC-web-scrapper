import { AxiosInstance } from "../../infra/http/axios";
import cheerio from "cheerio";

import { Pages, UNIP_BASE_URL } from "../../../../entities/pages";
import { CoursePageLink, LinkFormat, LinkType } from "../../../../entities/courseLinks";

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
        const name = this.inferLinkName($, link, title, type)
          .toUpperCase()
          .replace(/ /g, "_");
        const format = this.inferLinkFormat(type);
        return { url, type, format, name } as CoursePageLink;
      });
    return links;
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

  private inferLinkFormat(type: LinkType): LinkFormat {
    const formats: Partial<Record<LinkFormat, LinkType[]>> = {
      MP4: ["VIDEOAULA"],
      PDF: ["PLANO DE ENSINO", "SLIDE", "LIVRO TEXTO", "TEXTO COMPLEMENTAR"],
      HTML: ["ATIVIDADE", "QUESTIONARIO"],
    };
    for (let format of Object.entries(formats))
      if (format[1].includes(type)) return format[0] as LinkFormat;
    return "OUTROS";
  }

  private inferLinkName(
    $: cheerio.Root,
    link: any,
    title: string,
    type: LinkType
  ): string {
    if (["QUESTIONARIO", "ATIVIDADE"].includes(type)) {
      const [first, _, third] = title.split(" ");
      return `[${third}] ${first}`;
    }
    if (["TEXTO COMPLEMENTAR", "PLANO DE ENSINO", "LIVRO TEXTO"].includes(type))
      return title;
    const container = $(link).closest(".liItem");
    const unidade = container.find("h3 span:last-child").text().split(" ")["1"];
    const name = `[${unidade}] ${title}`;
    return name;
  }
}
