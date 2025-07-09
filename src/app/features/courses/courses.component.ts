import { Component, OnInit } from '@angular/core';
import { mockedCoursesList } from '../../shared/mocks/mocks';
import { Course } from "@app/shared/mocks/course.interface";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;

  ngOnInit() {
    this.courses = mockedCoursesList;
  }

  onCourseSelect(course: Course) {
    this.selectedCourse = course;
  }
}