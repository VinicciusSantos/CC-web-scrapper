import { GetCourseLinksOutput } from './../../../../../entities/courseLinks';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CourseLinksReponse as CourseLinksReponse,
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

  public getCourseLinks(courseId: string) {
    return this.http.get(
      `${API_PATH}/courses/${courseId}/downloadContent`
    ) as CourseLinksReponse;
  }

  public downloadCourseData(courseId: string, data: GetCourseLinksOutput) {
    return this.http.post(
      `${API_PATH}/courses/${courseId}/download`,
      data
    ) as DownloadCourseDataReponse;
  }
}
