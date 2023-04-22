import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import CoursesRepository from 'src/app/repositories/courses-repository/coursesRepository.service';
import Course from '../../../../../entities/courses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public courses$: Observable<Course[]> = of([]);

  constructor(private coursesRepository: CoursesRepository) {
    this.courses$ = this.coursesRepository.getAllCourses();
  }
}
