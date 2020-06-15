import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

interface SignInCredentials {
  token: string,
  user: { _id: string },
}

export const SESSION_TOKEN = 'session_token';
export const SESSION_USER_ID = 'session_user_id';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient, private storage: StorageService, private router: Router) { }

  public isSignedIn() {
    return this.getSessionToken() != null;
  }

  public getSessionToken() {
    return this.storage.getItem(SESSION_TOKEN);
  }

  public signin(email: string, password: string) {
    try {
      this.http.post<SignInCredentials>(`${environment.apiUrl}/auth/signin`, {email, password})
      .subscribe(signInCredentials => {
        this.storage.setItem(SESSION_TOKEN, signInCredentials.token);
        this.storage.setItem(SESSION_USER_ID, signInCredentials.user._id);
        this.router.navigate(['/tasks']);
      });
    } catch (e) {
    }
  }

  public signout() {
    this.storage.clear();
    this.router.navigate(['/login']);
  }
}