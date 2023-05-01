import { Component, Input, OnInit, ViewChild } from '@angular/core';

import Course from '../../../../../entities/courses';
import { CourseNotesComponent } from '../course-notes/course-notes.component';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course;

  @ViewChild(CourseNotesComponent)
  private courseNotesComponent!: CourseNotesComponent;

  public onReload(): void {
    this.courseNotesComponent.getGradesData();
  }

  public ngOnInit(): void {}
}
