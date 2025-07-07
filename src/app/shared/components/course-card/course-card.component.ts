import { Component, Input } from '@angular/core';
import { Course } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course!: Course;
}
