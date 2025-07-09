import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapper } from './http-client-wrapper.service';

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

interface Author {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly apiUrl: string;

  constructor(
    private http: HttpClientWrapper,
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

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/courses/${id}`);
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