import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbIconModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbTreeGridModule,
} from '@nebular/theme';

import { CardActionsComponent } from './card-actions/card-actions.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseModalComponent } from './course-modal/course-modal.component';
import { CourseNotesComponent } from './course-notes/course-notes.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DirectivesModule } from '../directives/directives.module';
import { TabComponent } from './tab/tab.component';

@NgModule({
  declarations: [
    CardActionsComponent,
    CourseCardComponent,
    CourseModalComponent,
    CourseNotesComponent,
    SidebarComponent,
    TabComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NbButtonModule,
    NbSpinnerModule,
    NbTooltipModule,
    NbIconModule,
    NbTreeGridModule,
    DirectivesModule,
  ],
  exports: [
    CardActionsComponent,
    CourseCardComponent,
    CourseModalComponent,
    CourseNotesComponent,
    SidebarComponent,
  ],
})
export class ComponentsModule {}
