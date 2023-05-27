import Course from "../../entities/courses";
import { Pages } from "../../entities/pages";
import { AxiosInstance } from "../../infra/http/axios";
import cheerio from "cheerio";

export default class GetCourseByIdUsecase {
  constructor() {}

  public async execute(courseId: string): Promise<Course> {
    const allCoursesPage = await AxiosInstance.get(Pages.ALL_COURSES);
    const $ = cheerio.load(allCoursesPage.data);
    const courses = $("#column0 .courseListing > li > a");
    return Object.values(courses)
      .filter((e: any) => e.attribs && e.attribs.href.includes(courseId))
      .map((e: any) => {
        return new Course(e.children[0].data, e.attribs.href);
      })[0];
  }
}
