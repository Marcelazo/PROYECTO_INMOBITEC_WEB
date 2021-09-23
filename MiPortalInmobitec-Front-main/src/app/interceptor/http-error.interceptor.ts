import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthErrorService } from '../services/errors/auth-error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private authError: AuthErrorService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        if (error.error instanceof ErrorEvent) {
          errorMsg = `Client-side Error: ${error.error.message}`;
        } else {
          // This is a interceptor errors service
          this.authError.resolve(error);
          errorMsg = `Server-side Error Code: ${error.status},  Message: ${error.message}`;
        }

        return throwError(error);
      })
    );
  }
}
