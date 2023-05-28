import { GetCourseLinksOutput } from '../../domain/entities/courseLinks';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CourseLinksReponse as CourseLinksReponse,
  DownloadCourseDataReponse,
  GetAllCoursesReponse,
  GetCourseGradesReponse,
} from './interfaces';
import Course from '../../domain/entities/courses';

export const API_PATH = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export default class CoursesService {
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
      `${API_PATH}/courses/${courseId}/links`
    ) as CourseLinksReponse;
  }

  public downloadCourseData(courseId: string, data: GetCourseLinksOutput) {
    return this.http.post(
      `${API_PATH}/courses/${courseId}/download`,
      data
    ) as DownloadCourseDataReponse;
  }
}
