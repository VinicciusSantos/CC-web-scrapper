import { Component, OnInit } from '@angular/core';
import { Observable, finalize, of, take } from 'rxjs';
import Course from '../../domain/entities/courses';
import CoursesService from 'src/app/services/courses-service/courses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public courses: Course[] = [];
  public filteredCourses: Course[] = [];
  public searchValue: string = '';
  public loading = true;
  public isDownloadModalOpen = false;
  public selectedCourseId = '';

  constructor(private coursesService: CoursesService) {}

  public onDownload(courseId: string): void {
    this.selectedCourseId = courseId;
    this.isDownloadModalOpen = true;
  }

  public onCloseDownloadModal(): void {
    this.selectedCourseId = '';
    this.isDownloadModalOpen = false;
  }

  public onSearch(): void {
    this.filteredCourses = this.courses.filter((course) =>
      course.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  public ngOnInit(): void {
    this.coursesService
      .getAllCourses()
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((res) => {
        if (!res.data) return;
        this.courses = res.data.courses.map(
          (c) => new Course(c.fullName, c.url)
        );
        this.filteredCourses = this.courses;
      });
  }
}
