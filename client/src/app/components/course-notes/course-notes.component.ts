import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';
import { NotesTableRow } from '../../domain/entities/notes';
import Course from '../../domain/entities/courses';
import { finalize, take } from 'rxjs';
import CoursesService from '../../services/courses-service/courses.service';

@Component({
  selector: 'app-course-notes',
  templateUrl: './course-notes.component.html',
  styleUrls: ['./course-notes.component.scss'],
})
export class CourseNotesComponent implements OnInit {
  @Input() public course!: Course;
  @Output() public loadingState = new EventEmitter<boolean>();

  public loading = false;
  public customColumn = 'item';
  public defaultColumns = ['nota', 'concluido'];
  public allColumns = [this.customColumn, ...this.defaultColumns];
  public dataSource!: NbTreeGridDataSource<NotesTableRow>;
  public data: NotesTableRow[] = [];

  constructor(
    private coursesService: CoursesService,
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
    this.coursesService
      .getCourseGrades(this.course)
      .pipe(take(1), finalize(() => {
        this.changeLoadingState(false);
      }))
      .subscribe((res) => {
        this.data = res.data.grades.map(
          (grade) =>
            new NotesTableRow(
              grade.item,
              grade.nota,
              grade.concluido
            )
        );
        this.buildTable();
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
