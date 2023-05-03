import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbIconModule,
  NbSpinnerModule,
  NbTooltipModule,
} from '@nebular/theme';

import { CourseCardComponent } from './course-card.component';
import { CourseNotesModule } from '../course-notes/course-notes.module';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CourseCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NbButtonModule,
    CourseNotesModule,
    CardActionsModule,
    NbIconModule,
    NbSpinnerModule,
  ],
  exports: [CourseCardComponent],
})
export class CourseCardModule {}
