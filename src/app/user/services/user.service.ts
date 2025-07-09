// src/app/auth/services/user.service.ts
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl: string;

  constructor(
    private http: HttpClient,
    @Optional() @Inject('API_URL') apiUrl?: string
  ) {
    this.apiUrl = apiUrl || 'http://localhost:4000/api';
  }

  getUser(): Observable<User> {
    const obs$ = this.http.get<User>(`${this.apiUrl}/users/me`);
    obs$.subscribe({ next: () => {}, error: () => {} });
    return obs$;
  }
}
