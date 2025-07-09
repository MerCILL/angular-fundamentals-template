import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<any[]>([]);
  
  public isLoading$ = this.isLoading$$.asObservable();
  public courses$ = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll(): Observable<any[]> {
    this.isLoading$$.next(true);
    return this.coursesService.getAll().pipe(
      tap(courses => {
        this.courses$$.next(courses);
        this.isLoading$$.next(false);
      })
    );
  }

  createCourse(course: any): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.createCourse(course).pipe(
      tap(newCourse => {
        const currentCourses = this.courses$$.value;
        this.courses$$.next([...currentCourses, newCourse]);
        this.isLoading$$.next(false);
      })
    );
  }

  getCourse(id: string): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.getCourse(id).pipe(
      tap(() => this.isLoading$$.next(false))
    );
  }

  editCourse(id: string, course: any): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.editCourse(id, course).pipe(
      tap(updatedCourse => {
        const currentCourses = this.courses$$.value;
        const index = currentCourses.findIndex(c => c.id === id);
        if (index !== -1) {
          currentCourses[index] = updatedCourse;
          this.courses$$.next([...currentCourses]);
        }
        this.isLoading$$.next(false);
      })
    );
  }

  deleteCourse(id: string): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.deleteCourse(id).pipe(
      tap(() => {
        const currentCourses = this.courses$$.value;
        const filteredCourses = currentCourses.filter(c => c.id !== id);
        this.courses$$.next(filteredCourses);
        this.isLoading$$.next(false);
      })
    );
  }

  filterCourses(value: string): Observable<any[]> {
    this.isLoading$$.next(true);
    return this.coursesService.filterCourses(value).pipe(
      tap(courses => {
        this.courses$$.next(courses);
        this.isLoading$$.next(false);
      })
    );
  }

  getAllAuthors(): Observable<any[]> {
    return this.coursesService.getAllAuthors();
  }

  createAuthor(name: string): Observable<any> {
    return this.coursesService.createAuthor(name);
  }

  getAuthorById(id: string): Observable<any> {
    return this.coursesService.getAuthorById(id);
  }
}