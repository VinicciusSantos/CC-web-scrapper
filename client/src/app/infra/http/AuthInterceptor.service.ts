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
import { Router } from '@angular/router';

@Injectable()
export default class AuthInterceptor implements HttpInterceptor {
  constructor(private toastrService: NbToastrService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error.msg || 'Unexpected Error!';
        if (error.status === 401) this.router.navigate(['/login']);
        this.toastrService.danger(errorMessage, 'Error');
        return throwError(errorMessage);
      })
    );
  }
}
