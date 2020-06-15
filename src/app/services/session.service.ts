import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Credentials {
  token: string;
  user: { _id: string };
}

export const SESSION_TOKEN = 'session_token';
export const SESSION_USER_ID = 'session_user_id';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) {}

  public isSignedIn() {
    return this.getSessionToken() != null;
  }

  public getSessionToken() {
    return this.storage.getItem(SESSION_TOKEN);
  }

  public signin(email: string, password: string): Observable<Credentials> {
    return this.http
      .post<Credentials>(`${environment.apiUrl}/auth/signin`, {
        email,
        password,
      })
      .pipe(
        map((credentials) => {
          this.storage.setItem(SESSION_TOKEN, credentials.token);
          this.storage.setItem(SESSION_USER_ID, credentials.user._id);
          this.router.navigate(['/tasks']);
          return credentials;
        })
      );
  }

  public signup(
    name: string,
    email: string,
    password: string
  ): Observable<Credentials> {
    return this.http
      .post<Credentials>(`${environment.apiUrl}/auth/signup`, {
        name,
        email,
        password,
      })
      .pipe(
        map((credentials) => {
          this.storage.setItem(SESSION_TOKEN, credentials.token);
          this.storage.setItem(SESSION_USER_ID, credentials.user._id);
          this.router.navigate(['/tasks']);
          return credentials;
        })
      );
  }

  public signout() {
    this.storage.clear();
    this.router.navigate(['/login']);
  }
}
