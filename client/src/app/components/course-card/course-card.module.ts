import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule } from '@nebular/theme';

import { CourseCardComponent } from './course-card.component';
import { CourseNotesModule } from '../course-notes/course-notes.module';

@NgModule({
  declarations: [CourseCardComponent],
  imports: [CommonModule, NbButtonModule, CourseNotesModule],
  exports: [CourseCardComponent],
})
export class CourseCardModule {}
