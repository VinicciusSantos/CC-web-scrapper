import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Course from '../../../../../entities/courses';
import { Injectable } from '@angular/core';

export const API_PATH = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export default class CoursesRepository {
  constructor(private http: HttpClient) {}

  public getAllCourses(): Observable<Course[]> {
    return this.http.get(`${API_PATH}/courses`) as Observable<Course[]>;
  }
}
