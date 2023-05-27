import cheerio from "cheerio";

import {
  CoursePageLink,
  GetCourseLinksOutput,
} from "../../entities/courseLinks";
import Link from "../../entities/Link";
import { Pages } from "../../entities/pages";
import { AxiosInstance } from "../../infra/http/axios";

export default class GetCourseLinksUsecase {
  constructor() {}

  public async execute(courseId: string): Promise<GetCourseLinksOutput> {
    const pageURL = Pages.COURSE_PAGE + courseId;
    const coursePage = await AxiosInstance.get(pageURL);
    const $ = cheerio.load(coursePage.data);
    const links = await this.extractLinksFromPage($);
    return this.formatLinks(links);
  }

  private async extractLinksFromPage(
    $: cheerio.Root
  ): Promise<CoursePageLink[]> {
    return $("a")
      .toArray()
      .map((e) => new Link(e, $))
      .filter((e) => e.isInternalUnipLink && !e.isImageLink)
      .map((e) => e.formatLink());
  }

  private formatLinks(links: CoursePageLink[]): GetCourseLinksOutput {
    const transformedObject: GetCourseLinksOutput = {};
    for (const item of links) {
      const unidade = item.unidade
        ? `Materiais Unidade ${item.unidade}`
        : "Outros Materiais";
      transformedObject[unidade] = transformedObject[unidade] || [];
      transformedObject[unidade].push(item);
    }
    return transformedObject;
  }
}
