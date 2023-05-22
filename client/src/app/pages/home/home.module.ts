import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbLayoutModule } from '@nebular/theme';
import { CourseCardModule } from 'src/app/components/course-card/course-card.module';

import { CourseModalComponent } from './course-modal/course-modal.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [HomeComponent, CourseModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    CourseCardModule,
    DirectivesModule,
    HomeRoutingModule
  ],
})
export class HomeModule {}
