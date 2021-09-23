import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.match(/^http(s)?:\/\/(.*)$/)) {
      const url = `${env.url}${request.url}`.replace(/([^:]\/)\/+/g, '$1');
      request = request.clone({ url });
    }
    return next.handle(request);
  }
}
