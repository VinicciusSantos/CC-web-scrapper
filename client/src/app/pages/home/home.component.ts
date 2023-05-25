import { Component, OnInit } from '@angular/core';
import { Observable, finalize, of, take } from 'rxjs';
import Course from '../../../../../entities/courses';
import CoursesService from 'src/app/services/courses-service/courses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public courses: Course[] = [];
  public loading = true;

  constructor(private coursesService: CoursesService) {}

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
      });
  }
}
