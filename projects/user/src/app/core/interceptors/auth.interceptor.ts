import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('auth')){
      return next.handle(request)
    }
    else
    {
      const newRequest=request.clone({
        headers:request.headers.append('Authorization',localStorage.getItem('userToken')!)
      })
      return next.handle(newRequest);
    }
  }
}
