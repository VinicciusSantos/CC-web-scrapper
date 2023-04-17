import axios from 'axios';
import cheerio from 'cheerio';

import Course from '../../../../entities/courses';
import { Pages, UNIP_BASE_URL } from '../../../../entities/pages';

const AxiosInstance = axios.create({ baseURL: UNIP_BASE_URL });

export default class GetCoursesUsecase {
  public async execute(): Promise<Course[]> {
    const allCoursesPage = await AxiosInstance.get(Pages.ALL_COURSES);
    const $ = cheerio.load(allCoursesPage.data);
    const courses = $('#column0 .courseListing > li > a');
    return Object.values(courses)
      .filter((e: any) => e.attribs)
      .map((e: any) => {
        return new Course(e.children[0].data, e.attribs.href);
      });
  }
}
