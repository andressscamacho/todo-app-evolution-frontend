import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

const HTTP_UNAUTHORIZED_STATUS_CODE = 401;

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private sessionService: SessionService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionService.getSessionToken();

    let newRequest = req;

    if (token != null) {
      newRequest = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(newRequest).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === HTTP_UNAUTHORIZED_STATUS_CODE) {
          //TODO(avelandia) check what to do when response from server is unauthorized
          //this.router.navigateByUrl('/login');
        }

        return throwError( err );
      })
    );
  }
}
