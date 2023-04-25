import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginRoutingModule } from './home-routing.module';
import { NbLayoutModule } from '@nebular/theme';
import { CourseCardModule } from 'src/app/components/course-card/course-card.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, NbLayoutModule, CourseCardModule],
  exports: [LoginRoutingModule],
})
export class HomeModule {}
