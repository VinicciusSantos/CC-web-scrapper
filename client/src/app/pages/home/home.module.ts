import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbIconModule,
  NbLayoutModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    DirectivesModule,
    HomeRoutingModule,
    ComponentsModule,
    NbLayoutModule,
  ],
})
export class HomeModule {}
