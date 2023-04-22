import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH } from '../courses-repository/coursesRepository.service';

@Injectable({
  providedIn: 'root',
})
export default class AuthRepository {
  constructor(private http: HttpClient) {}

  public login(loginInput: any): Observable<any> {
    return this.http.post(`${API_PATH}/credentials`, loginInput, {
      observe: 'response',
    }) as Observable<any>;
  }
}
