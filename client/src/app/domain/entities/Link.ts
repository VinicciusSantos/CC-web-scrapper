import cheerio from "cheerio";
import { UNIP_BASE_URL } from "./pages";
import { CoursePageLink, LinkFormat, LinkType } from "./courseLinks";
import { link } from "fs";

export default class Link {
  public get isInternalUnipLink(): boolean {
    const { href } = this.value.attribs;
    const prefix =
      "/webapps/blackboard/content/launchAssessment.jsp?course_id=";
    return href.startsWith(UNIP_BASE_URL) || href.startsWith(prefix);
  }

  public get isImageLink(): boolean {
    const $ = cheerio;
    return !!$(this.value).html()!.includes("<img");
  }

  constructor(private value: any, private $: cheerio.Root) {}

  public formatLink(): CoursePageLink {
    const title = this.$(this.value).text().trim();
    const url = this.value.attribs.href;
    const type = this.inferLinkType(title, url);
    const unidade = this.inferUnidade();
    const name = this.inferLinkName(title, type)
      .toUpperCase()
      .replace(/ /g, "_");
    const format = this.inferLinkFormat(type);
    return { url, type, format, name, unidade };
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

  private inferUnidade(): string | null {
    const withoutUnidades = ["PLANO DE ENSINO", "FÓRUM DE DISCUSSÃO"];
    const container = this.$(this.value).closest(".liItem");
    const headerText = container
      .find("h3 span:last-child")
      .text()
      .toUpperCase();
    if (withoutUnidades.includes(headerText)) return null;
    if (headerText.includes("QUEST") || headerText.includes("ATIVIDADE"))
      return headerText.split(" ")[2];
    return headerText.split(" ")[1];
  }

  private inferLinkName(title: string, type: LinkType): string {
    if (!["QUESTIONARIO", "ATIVIDADE"].includes(type)) return title;
    const [first, _, third] = title.split(" ");
    return `${first} unidade ${third}`;
  }
}
