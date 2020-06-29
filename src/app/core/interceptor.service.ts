import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  private regexUrl = new RegExp(/^https:\/\/pokeapi.co\/api\/v2/);
  private cache: { [ url: string]: HttpResponse<any> } = {};

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<any> {
    if (this.regexUrl.test(request.url)) {
      if (!!this.cache[request.url]) {
          return of(this.cache[request.url].clone());
      }

      return next.handle(request).pipe(
        tap(result => {
          if (result instanceof HttpResponse) {
            this.cache[request.url] = result.clone();
          }
        }),
      );
    }

    return next.handle(request);
  }
}
