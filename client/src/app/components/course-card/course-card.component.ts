import { Component, Input, ViewChild } from '@angular/core';

import Course from '../../../../../entities/courses';
import { CourseNotesComponent } from '../course-notes/course-notes.component';
import CoursesRepository from 'src/app/repositories/courses-repository/coursesRepository.service';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() public course!: Course;
  public loading = false;

  @ViewChild(CourseNotesComponent)
  private courseNotesComponent!: CourseNotesComponent;

  constructor(
    private coursesRepository: CoursesRepository,
    private http: HttpClient
  ) {}

  public onReloadData(): void {
    this.courseNotesComponent.getGradesData();
  }

  public onDownloadData(): void {
    this.coursesRepository
      .downloadCourseData(this.course)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
      });
  }

  public onChangeLoadingState(newState: boolean) {
    this.loading = newState;
  }

  public downloadPDF(url: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      window.open(downloadUrl);
    });
  }
}
