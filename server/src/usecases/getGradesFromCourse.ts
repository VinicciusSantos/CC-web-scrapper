import { NotesTableRow } from "./../../../entities/notes";
import cheerio from "cheerio";

import { Pages } from "../../../entities/pages";
import { AxiosInstance } from "../axios";

export default class GetGradesFromCourseUsecase {
  constructor() {}

  public async execute(courseId: string): Promise<NotesTableRow[]> {
    console.log("🚀 ~ file: getGradesFromCourse.ts:11 ~ GetGradesFromCourseUsecase ~ execute ~ courseId:", courseId)
    const allCoursesPage = await AxiosInstance.get(
      Pages.COURSE_GRADES + courseId
    ).catch(e => {
      console.log(Object.values(e))
    })
    // const $ = cheerio.load(allCoursesPage.data);
    return [
      {
        unidade: "Unidade 1",
        media: 4.5,
        concluido: false,
        tentativas: 2,
      },
      {
        unidade: "Unidade 2",
        media: 8.0,
        concluido: true,
        tentativas: 3,
      },
    ];
  }
}
