import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';
import { NotesTableRow } from '../../../../../entities/notes';
import CoursesRepository from 'src/app/repositories/courses-repository/coursesRepository.service';
import Course from '../../../../../entities/courses';
import { take } from 'rxjs';

@Component({
  selector: 'app-course-notes',
  templateUrl: './course-notes.component.html',
  styleUrls: ['./course-notes.component.scss'],
})
export class CourseNotesComponent implements OnInit {
  @Input() public course!: Course;
  @Output() public loadingState = new EventEmitter<boolean>();

  public loading = false;
  public customColumn = 'unidade';
  public defaultColumns = ['media', 'tentativas', 'concluido'];
  public allColumns = [this.customColumn, ...this.defaultColumns];
  public dataSource!: NbTreeGridDataSource<NotesTableRow>;
  public data: NotesTableRow[] = [];

  constructor(
    private coursesRepository: CoursesRepository,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<NotesTableRow>
  ) {}

  public getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }

  public changeLoadingState(newState: boolean): void {
    this.loading = newState;
    this.loadingState.emit(newState);
  }

  public getGradesData(): void {
    this.clearGradesData();
    this.changeLoadingState(true);
    this.coursesRepository
      .getCourseGrades(this.course)
      .pipe(take(1))
      .subscribe((res) => {
        this.data = res.data.grades.map(
          (grade) =>
            new NotesTableRow(
              grade.unidade,
              grade.media,
              grade.tentativas,
              grade.concluido
            )
        );
        this.buildTable();
        this.changeLoadingState(false);
      });
  }

  public clearGradesData(): void {
    this.data = [];
    this.buildTable();
  }

  private buildTable(): void {
    this.dataSource = this.dataSourceBuilder.create(
      this.data.map((data) => {
        return { data };
      })
    );
  }

  public get showEmptyStateImage(): boolean {
    return !this.loading && this.data.length === 0;
  }

  public ngOnInit(): void {
    this.getGradesData();
  }
}
