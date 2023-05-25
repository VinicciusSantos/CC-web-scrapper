import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH } from '../courses-service/courses.service';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  constructor(private http: HttpClient) {}

  public login(loginInput: any): Observable<any> {
    return this.http.post(`${API_PATH}/credentials`, loginInput, {
      observe: 'response',
    }) as Observable<any>;
  }
}
