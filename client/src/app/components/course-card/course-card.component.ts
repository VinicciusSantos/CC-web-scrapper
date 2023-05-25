import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import Course from '../../../../../entities/courses';
import { CourseNotesComponent } from '../course-notes/course-notes.component';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() public course!: Course;
  @Output() public onDownload = new EventEmitter<string>();
  public loading = false;

  @ViewChild(CourseNotesComponent)
  private courseNotesComponent!: CourseNotesComponent;

  constructor() {}

  public onReloadData(): void {
    this.courseNotesComponent.getGradesData();
  }

  public onChangeLoadingState(newState: boolean) {
    this.loading = newState;
  }
}
