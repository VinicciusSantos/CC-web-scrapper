import { Component } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import CoursesRepository from 'src/app/repositories/courses-repository/coursesRepository.service';
import Course from '../../../../../entities/courses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public courses: Course[] = [];

  constructor(private coursesRepository: CoursesRepository) {
    this.coursesRepository
      .getAllCourses()
      .pipe(take(1))
      .subscribe((res) => (this.courses = res.data.courses));
  }
}
