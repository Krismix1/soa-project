import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '@project-assignment/shared/data-models-api';
import { Observable } from 'rxjs';

export const EXCLUDE_REQUEST = new HttpContextToken(() => false);

export interface UserCreds {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpCreds {
  username: string;
  password: string;
  repeatPassword: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(creds: UserCreds): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', creds, {
      context: new HttpContext().set(EXCLUDE_REQUEST, true),
    });
  }

  signUp(creds: SignUpCreds): Observable<void> {
    return this.http.post<void>('/api/auth/register', creds, {
      context: new HttpContext().set(EXCLUDE_REQUEST, true),
    });
  }
}
