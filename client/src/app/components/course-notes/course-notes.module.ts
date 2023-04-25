import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbIconModule, NbTreeGridModule } from '@nebular/theme';

import { CourseNotesComponent } from './course-notes.component';

@NgModule({
  declarations: [CourseNotesComponent],
  imports: [CommonModule, NbTreeGridModule, NbIconModule],
  exports: [CourseNotesComponent],
})
export class CourseNotesModule {}
