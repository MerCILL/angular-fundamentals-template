import { Component } from '@angular/core';
import { Course, mockedCoursesList } from './shared/mocks/mocks';

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