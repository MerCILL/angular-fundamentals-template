import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, filter } from 'rxjs/operators';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStateFacade } from './courses.facade';
import * as CoursesActions from './courses.actions';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade,
    private router: Router
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      switchMap(() =>
        this.coursesService.getAll().pipe(
          map((courses) => CoursesActions.requestAllCoursesSuccess({ courses })),
          catchError((error) => of(CoursesActions.requestAllCoursesFail({ error: error.message })))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      switchMap(({ title }) =>
        this.coursesStateFacade.allCourses$.pipe(
          map((courses) => {
            const filteredCourses = courses.filter(course => 
              course.title.toLowerCase().includes(title.toLowerCase())
            );
            return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
          }),
          catchError((error) => of(CoursesActions.requestFilteredCoursesFail({ error: error.message })))
        )
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      switchMap(({ id }) =>
        this.coursesService.getCourse(id).pipe(
          map((course) => CoursesActions.requestSingleCourseSuccess({ course })),
          catchError((error) => of(CoursesActions.requestSingleCourseFail({ error: error.message })))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      switchMap(({ id }) =>
        this.coursesService.deleteCourse(id).pipe(
          map(() => CoursesActions.requestAllCourses()),
          catchError((error) => of(CoursesActions.requestDeleteCourseFail({ error: error.message })))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      switchMap(({ id, course }) =>
        this.coursesService.editCourse(id, course).pipe(
          map((updatedCourse) => CoursesActions.requestEditCourseSuccess({ course: updatedCourse })),
          catchError((error) => of(CoursesActions.requestEditCourseFail({ error: error.message })))
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      switchMap(({ course }) =>
        this.coursesService.createCourse(course).pipe(
          map((createdCourse) => CoursesActions.requestCreateCourseSuccess({ course: createdCourse })),
          catchError((error) => of(CoursesActions.requestCreateCourseFail({ error: error.message })))
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CoursesActions.requestCreateCourseSuccess,
        CoursesActions.requestEditCourseSuccess,
        CoursesActions.requestSingleCourseFail
      ),
      tap(() => this.router.navigate(['/courses']))
    ),
    { dispatch: false }
  );
}