import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  successful: boolean;
  result: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl: string;
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    @Optional() @Inject('API_URL') apiUrl?: string
  ) {
    this.apiUrl = apiUrl || 'http://localhost:4000/api';
    const token = this.sessionStorageService.getToken();
    if (token) {
      this.isAuthorized$$.next(true);
    }
  }

  login(user: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, user).pipe(
      tap(response => {
        if (response.successful) {
          this.sessionStorageService.setToken(response.result);
          this.isAuthorized$$.next(true);
        }
      }),
      finalize(() => {})
    );
  }

  logout(): void {
    this.sessionStorageService.deleteToken();
    this.isAuthorized$$.next(false);
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, user).pipe(
      tap(response => {
        if (response.successful) {
          this.sessionStorageService.setToken(response.result);
          this.isAuthorized$$.next(true);
        }
      }),
      finalize(() => {})
    );
  }

  get isAuthorised(): boolean {
    return this.isAuthorized$$.value;
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return '/login';
  }
}