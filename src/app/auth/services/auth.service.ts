import { Injectable, Inject, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';
import { HttpClientWrapper } from '@app/services/http-client-wrapper.service';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  successful: boolean;
  result: string; // токен
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
    private http: HttpClientWrapper,
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
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, user)
      .pipe(
        tap((response: AuthResponse) => {
          if (response.successful) {
            this.sessionStorageService.setToken(response.result);
            this.isAuthorized$$.next(true);
          }
        })
      );
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/register`, user)
      .pipe(
        tap((response: AuthResponse) => {
          if (response.successful) {
            this.sessionStorageService.setToken(response.result);
            this.isAuthorized$$.next(true);
          }
        })
      );
  }

  logout(): void {
    this.sessionStorageService.deleteToken();
    this.isAuthorized$$.next(false);
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