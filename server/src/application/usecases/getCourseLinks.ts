import { Pages, UNIP_BASE_URL } from "../../../../entities/pages";
import { AxiosInstance } from "../../infra/http/axios";
import cheerio from "cheerio";

export type LinkType =
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

export default class GetCourseLinksUsecase {
  constructor() {}

  public async execute(courseId: string): Promise<CoursePageLink[]> {
    const pageURL = Pages.COURSE_PAGE + courseId;
    const coursePage = await AxiosInstance.get(pageURL);
    const $ = cheerio.load(coursePage.data);
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
}
