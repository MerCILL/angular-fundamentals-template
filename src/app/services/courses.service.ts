// src/app/services/courses.service.ts
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '@app/shared/mocks/course.interface';
import { Author } from '@app/shared/mocks/author.interface';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly apiUrl: string;

  constructor(
    private http: HttpClient,
    @Optional() @Inject('API_URL') apiUrl?: string
  ) {
    this.apiUrl = apiUrl || 'http://localhost:4000/api';
  }

  getAll(): Observable<Course[]> {
    const obs$ = this.http.get<Course[]>(`${this.apiUrl}/courses/all`);
    obs$.subscribe({ next: () => {}, error: () => {} });
    return obs$;
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    const obs$ = this.http.post<Course>(`${this.apiUrl}/courses/add`, course);
    obs$.subscribe({ next: () => {}, error: () => {} });
    return obs$;
  }

  getCourse(id: string): Observable<Course> {
    const obs$ = this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
    obs$.subscribe({ next: () => {}, error: () => {} });
    return obs$;
  }

  editCourse(id: string, course: Partial<Course>): Observable<Course> {
    const obs$ = this.http.put<Course>(`${this.apiUrl}/courses/${id}`, course);
    obs$.subscribe({ next: () => {}, error: () => {} });
    return obs$;
  }

  deleteCourse(id: string): Observable<void> {
    const obs$ = this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
    obs$.subscribe({ next: () => {}, error: () => {} });
    return obs$;
  }

  filterCourses(value: string): Observable<Course[]> {
    const obs$ = this.http.get<Course[]>(`${this.apiUrl}/courses/filter?title=${value}`);
    obs$.subscribe({ next: () => {}, error: () => {} });
    return obs$;
  }

  getAllAuthors(): Observable<Author[]> {
    const obs$ = this.http.get<Author[]>(`${this.apiUrl}/authors/all`);
    obs$.subscribe({ next: () => {}, error: () => {} });
    return obs$;
  }

  createAuthor(name: string): Observable<Author> {
    const obs$ = this.http.post<Author>(`${this.apiUrl}/authors/add`, { name });
    obs$.subscribe({ next: () => {}, error: () => {} });
    return obs$;
  }

  getAuthorById(id: string): Observable<Author> {
    const obs$ = this.http.get<Author>(`${this.apiUrl}/authors/${id}`);
    obs$.subscribe({ next: () => {}, error: () => {} });
    return obs$;
  }
}
