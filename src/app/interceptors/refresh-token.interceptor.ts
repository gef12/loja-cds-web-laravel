
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {mergeMap, catchError} from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

/**
 * Refresh do token quando o mesmo esta expirado. Caso queira mudar olhar nas config do JWT
 */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError((errorResponse: HttpErrorResponse) => {
      const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse.error;

      if (errorResponse.status === 401 && error.error === 'token_expired') {
        const http = this.injector.get(HttpClient);

        return http.post<any>(`${environment.api_url}/auth/refresh`, {}).pipe(
          mergeMap(data => {
            localStorage.setItem('token', data.token);
            /**
             * Clona a requisição e coloca o cabeçalho Bearer
             */
            const cloneRequest = request.clone({setHeaders: {'Authorization': `Bearer ${data.token}`}});

            return next.handle(cloneRequest);
          }));
      }

      return observableThrowError(errorResponse);
    }));

  }
}
