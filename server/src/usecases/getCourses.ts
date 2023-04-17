import cheerio from "cheerio";

import Course from "../../../entities/courses";
import { Pages } from "../../../entities/pages";
import { AxiosInstance } from "../axios";

export default class GetCoursesUsecase {
  constructor() {}

  public async execute(): Promise<Course[]> {
    const allCoursesPage = await AxiosInstance.get(Pages.ALL_COURSES);
    console.log(AxiosInstance.defaults.headers)
    const $ = cheerio.load(allCoursesPage.data);
    const courses = $("#column0 .courseListing > li > a");
    return Object.values(courses)
      .filter((e: any) => e.attribs)
      .map((e: any) => {
        return new Course(e.children[0].data, e.attribs.href);
      });
  }
}
