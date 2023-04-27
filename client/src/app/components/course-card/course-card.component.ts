import { Component, Input, OnInit } from '@angular/core';

import Course from '../../../../../entities/courses';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course;
  
  public ngOnInit(): void {
    console.log("🚀 ~ file: course-card.component.ts:12 ~ CourseCardComponent ~ course:", this.course)

  }
}
