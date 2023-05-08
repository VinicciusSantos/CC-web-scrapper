import cheerio from "cheerio";

import Course from "../../../../entities/courses";
import { Pages } from "../../../../entities/pages";
import { AxiosInstance } from "../../infra/http/axios";
import NotAuthorizedError from "../errors/notAuthorized";

export default class GetCoursesUsecase {
  constructor() {}

  public async execute(): Promise<Course[]> {
    const allCoursesPage = await AxiosInstance.get(Pages.ALL_COURSES);
    const $ = cheerio.load(allCoursesPage.data);
    if (this.isInLoginPage($)) throw new NotAuthorizedError();
    const courses = $("#column0 .courseListing > li > a");
    return Object.values(courses)
      .filter((e: any) => e.attribs)
      .map((e: any) => {
        return new Course(e.children[0].data, e.attribs.href);
      });
  }

  private isInLoginPage($: cheerio.Root): boolean {
    const res = $("#loginFormFields");
    return res.length > 0;
  }
}
