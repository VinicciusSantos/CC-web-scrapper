import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllCoursesReponse, GetCourseGradesReponse } from './interfaces';
import Course from '../../../../../entities/courses';

export const API_PATH = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export default class CoursesRepository {
  constructor(private http: HttpClient) {}

  public getAllCourses(): GetAllCoursesReponse {
    return this.http.get(`${API_PATH}/courses`) as GetAllCoursesReponse;
  }

  public getCourseGrades(course: Course) {
    return this.http.get(
      `${API_PATH}/courses/${course.id}/grades`
    ) as GetCourseGradesReponse;
  }
}
