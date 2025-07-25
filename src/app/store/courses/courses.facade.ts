import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';

@Injectable({
  providedIn: 'root'
})
export class CoursesStateFacade {
  isAllCoursesLoading$: Observable<boolean>;
  isSingleCourseLoading$: Observable<boolean>;
  isSearchingState$: Observable<boolean>;
  courses$: Observable<any[]>;
  allCourses$: Observable<any[]>;
  course$: Observable<any>;
  errorMessage$: Observable<string>;

  constructor(private store: Store) {
    this.isAllCoursesLoading$ = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
    this.isSingleCourseLoading$ = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
    this.isSearchingState$ = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));
    this.courses$ = this.store.pipe(select(CoursesSelectors.getCourses));
    this.allCourses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));
    this.course$ = this.store.pipe(select(CoursesSelectors.getCourse));
    this.errorMessage$ = this.store.pipe(select(CoursesSelectors.getErrorMessage));
  }

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
  }

  editCourse(body: any, id: string): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ course: body, id }));
  }

  createCourse(body: any): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}