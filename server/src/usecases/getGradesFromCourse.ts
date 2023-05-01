import { NotesTableRow } from "./../../../entities/notes";
import cheerio from "cheerio";

import { Pages } from "../../../entities/pages";
import { AxiosInstance } from "../axios";

export default class GetGradesFromCourseUsecase {
  constructor() {}

  public async execute(courseId: string): Promise<NotesTableRow[]> {
    const pageURL = Pages.COURSE_GRADES + courseId;
    const gradesPage = await AxiosInstance.get(pageURL);
    const $ = cheerio.load(gradesPage.data);
    const rows = this.getTableRows($);
    let grades = rows.map((row) => this.parseRow($, row));
    return this.sortGrades(grades);
  }

  private getTableRows($: cheerio.Root) {
    return $(".graded_item_row")
      .toArray()
      .filter((row) => $(row).find("a").length > 0);
  }

  private parseRow($: cheerio.Root, row: any) {
    const unidade = $(row).find("a").first().text().trim();
    const grade = $(row).find(".grade").text().trim();
    const pointsPossible = $(row).find(".pointsPossible").text().trim();
    const media = this.calculateMedia(grade, pointsPossible);
    const tentativas = 0;
    const concluido = true;
    return { unidade, media, tentativas, concluido };
  }

  private calculateMedia(grade: string, pointsPossible: string) {
    const media = `${grade.slice(
      0,
      Math.min(grade.indexOf("/"), 4)
    )}${pointsPossible}`;
    return media;
  }

  private sortGrades(grades: NotesTableRow[]): NotesTableRow[] {
    return grades.sort((a, b) => a.unidade.localeCompare(b.unidade));
  }
}
