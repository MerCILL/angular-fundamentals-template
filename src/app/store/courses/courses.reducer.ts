import { createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  allCourses: any[];
  course: any;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: ''
};

export const coursesReducer = createReducer(
  initialState,
  
  // Request all courses
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: ''
  })),
  
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    isSearchState: false
  })),
  
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error
  })),
  
  // Request single course
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: ''
  })),
  
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isSingleCourseLoading: false
  })),
  
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error
  })),
  
  // Request filtered courses
  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    isSearchState: true,
    errorMessage: ''
  })),
  
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    isSearchState: true
  })),
  
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error
  })),
  
  // Delete course
  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    errorMessage: ''
  })),
  
  on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
    ...state
  })),
  
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error
  })),
  
  // Edit course
  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    errorMessage: ''
  })),
  
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    course
  })),
  
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error
  })),
  
  // Create course
  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    errorMessage: ''
  })),
  
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    course
  })),
  
  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error
  }))
);