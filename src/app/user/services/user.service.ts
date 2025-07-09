// user.service.ts
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClientWrapper } from '@app/services/http-client-wrapper.service';
import { Observable } from 'rxjs';

interface User {
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
    private http: HttpClientWrapper,
    @Optional() @Inject('API_URL') apiUrl?: string
  ) {
    this.apiUrl = apiUrl || 'http://localhost:4000/api';
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`);
  }
}