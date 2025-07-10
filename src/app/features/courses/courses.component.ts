import { Component, OnInit } from '@angular/core';
import { Course } from "@app/shared/mocks/course.interface";
import { CoursesStateFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;

  constructor(private coursesFacade: CoursesStateFacade) {}

  ngOnInit() {
    // Dispatch action to load all courses
    this.coursesFacade.getAllCourses();
    // Subscribe to the courses$ observable from the facade
    this.coursesFacade.courses$.subscribe(courses => {
      this.courses = courses;
    });
  }

  onCourseSelect(course: Course) {
    this.selectedCourse = course;
  }
}