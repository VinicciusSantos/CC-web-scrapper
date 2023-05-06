import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export default class AuthInterceptor implements HttpInterceptor {
  constructor(private toastrService: NbToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error.msg || 'Unexpected Error!'
        this.toastrService.danger(errorMessage, 'Error');
        return throwError(errorMessage);
      })
    );
  }
}
