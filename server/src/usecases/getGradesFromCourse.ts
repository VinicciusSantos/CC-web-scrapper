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
    const finishedRows = this.getFinisheditemsRows($);
    const unfinishedRows = this.getUnfinisheditemsRows($);
    let grades = [...finishedRows, ...unfinishedRows];
    return this.sortGrades(grades);
  }

  private getFinisheditemsRows($: cheerio.Root) {
    return $(".graded_item_row")
      .toArray()
      .map((row) => this.parseRow($, row, true));
  }

  private getUnfinisheditemsRows($: cheerio.Root) {
    return $(".upcoming_item_row")
      .toArray()
      .map((row) => this.parseRow($, row, false));
  }

  private parseRow($: cheerio.Root, row: any, concluido = false) {
    const unidade = this.findUnidade($, row);
    const grade = $(row).find(".grade").text().trim();
    const media = concluido ? this.calculateMedia($, row, grade) : null;
    return { unidade, media, concluido };
  }

  private findUnidade($: cheerio.Root, row: any): string {
    return $(row).first().children().first().children().first().text().trim();
  }

  private calculateMedia($: cheerio.Root, row: any, grade: string) {
    const pointsPossible = $(row).find(".pointsPossible").text().trim();
    const media = `${grade.slice(0, 4)}${pointsPossible}`;
    return media;
  }

  private sortGrades(grades: NotesTableRow[]): NotesTableRow[] {
    return grades.sort((a, b) => a.unidade.localeCompare(b.unidade));
  }
}
