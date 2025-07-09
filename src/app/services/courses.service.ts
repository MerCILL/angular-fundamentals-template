import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
    return this.http.get<Course[]>(`${this.apiUrl}/courses/all`);
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses/add`, course);
  }

  editCourse(id: string, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/courses/${id}`, course);
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }

  filterCourses(value: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/filter?title=${value}`);
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrl}/authors/all`);
  }

  createAuthor(name: string): Observable<Author> {
    return this.http.post<Author>(`${this.apiUrl}/authors/add`, { name });
  }

  getAuthorById(id: string): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/authors/${id}`);
  }
}