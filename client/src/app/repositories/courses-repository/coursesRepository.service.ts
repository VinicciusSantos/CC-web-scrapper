import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllCoursesReponse } from './interfaces';

export const API_PATH = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export default class CoursesRepository {
  constructor(private http: HttpClient) {}

  public getAllCourses(): GetAllCoursesReponse {
    return this.http.get(`${API_PATH}/courses`) as GetAllCoursesReponse;
  }
}
