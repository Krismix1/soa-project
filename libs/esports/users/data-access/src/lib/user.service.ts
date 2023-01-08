import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '@project-assignment/shared/data-models-api';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUserDetails(id: number | string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`/api/users/${id}`);
  }

  getCurrentUserDetails(): Observable<UserDetails> {
    return this.http.get<UserDetails>('/api/users/me');
  }
}
