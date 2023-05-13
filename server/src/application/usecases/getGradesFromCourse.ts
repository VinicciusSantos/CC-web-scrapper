import cheerio from "cheerio";
import { AxiosInstance } from "../../infra/http/axios";
import { NotesTableRow } from "../../../../entities/notes";
import { Pages } from "../../../../entities/pages";

export default class GetGradesFromCourseUsecase {
  constructor() {}

  public async execute(courseId: string): Promise<NotesTableRow[]> {
    const pageURL = Pages.COURSE_GRADES + courseId;
    const gradesPage = await AxiosInstance.get(pageURL);
    const $ = cheerio.load(gradesPage.data);
    const finishedRows = this.getGradedItemsRows($);
    const unfinishedRows = this.getUpcomingItemsRows($);
    const grades = [...this.sortGrades([...finishedRows, ...unfinishedRows])];
    const totalGradesRow = this.getTotalGradesRow($, grades);
    return [...grades, totalGradesRow];
  }

  private getGradedItemsRows($: cheerio.Root): NotesTableRow[] {
    return $(".graded_item_row")
      .toArray()
      .map((row) => this.parseRow($, row, true));
  }

  private getUpcomingItemsRows($: cheerio.Root): NotesTableRow[] {
    return $(".upcoming_item_row")
      .toArray()
      .map((row) => this.parseRow($, row, false));
  }

  private getTotalGradesRow(
    $: cheerio.Root,
    grades: NotesTableRow[]
  ): NotesTableRow {
    const row = $(".calculatedRow");
    const grade = row.find("span.grade").text().trim();
    const nota = grade === "-" ? null : this.calculateNota($, row, grade);
    const concluido = grades.every((grade) => grade.concluido);
    return { item: "Total", nota, concluido };
  }

  private parseRow(
    $: cheerio.Root,
    row: any,
    finished: boolean
  ): NotesTableRow {
    const item = this.findItemName($, row);
    const grade = $(row).find(".grade").text().trim();
    const nota = finished ? this.calculateNota($, row, grade) : null;
    return { item, nota, concluido: finished };
  }

  private findItemName($: cheerio.Root, row: any): string {
    return $(row).first().children().first().children().first().text().trim();
  }

  private calculateNota($: cheerio.Root, row: any, grade: string): string {
    const pointsPossible = $(row).find(".pointsPossible").text().trim();
    const nota = `${grade.slice(0, 4)}${pointsPossible}`;
    return nota.replace(/ /g, '_');
  }

  private sortGrades(grades: NotesTableRow[]): NotesTableRow[] {
    return grades.sort((a, b) => a.item.localeCompare(b.item));
  }
}
