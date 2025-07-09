import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export abstract class HttpClientWrapper {
  abstract get<T>(url: string): Observable<T>;
  abstract post<T>(url: string, body: any): Observable<T>;
  abstract put<T>(url: string, body: any): Observable<T>;
  abstract delete<T>(url: string): Observable<T>;
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientWrapperService extends HttpClientWrapper {
  constructor(private http: HttpClient) {
    super();
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}

@Injectable({
  providedIn: 'root'
})
export class MockHttpClientService extends HttpClientWrapper {
  get<T>(url: string): Observable<T> {
    return of({} as T);
  }

  post<T>(url: string, body: any): Observable<T> {
    return of({} as T);
  }

  put<T>(url: string, body: any): Observable<T> {
    return of({} as T);
  }

  delete<T>(url: string): Observable<T> {
    return of({} as T);
  }
}