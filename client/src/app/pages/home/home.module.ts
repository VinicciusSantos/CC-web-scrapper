import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbCheckboxModule,
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { CourseCardModule } from 'src/app/components/course-card/course-card.module';

import { CourseModalComponent } from './course-modal/course-modal.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@NgModule({
  declarations: [HomeComponent, CourseModalComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    CourseCardModule,
    DirectivesModule,
    HomeRoutingModule,
    NbCheckboxModule,
  ],
})
export class HomeModule {}
