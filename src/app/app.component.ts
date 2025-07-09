import { Component } from '@angular/core';
import { mockedCoursesList } from './shared/mocks/mocks';
import { Course } from "./shared/mocks/course.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  courses = mockedCoursesList;
  
  sampleCourse: Course = this.courses[0];
}