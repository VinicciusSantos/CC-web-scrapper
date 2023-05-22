import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DownloadContentReponse,
  DownloadCourseDataReponse,
  GetAllCoursesReponse,
  GetCourseGradesReponse,
} from './interfaces';
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

  public getDownloadContent(courseId: string) {
    return this.http.get(
      `${API_PATH}/courses/${courseId}/downloadContent`
    ) as DownloadContentReponse;
  }

  public downloadCourseData(course: Course) {
    return this.http.get(
      `${API_PATH}/courses/${course.id}/download`
    ) as DownloadCourseDataReponse;
  }
}
