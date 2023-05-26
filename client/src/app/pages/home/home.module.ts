import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DirectivesModule,
    HomeRoutingModule,
    ComponentsModule,
    NbLayoutModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
  ],
})
export class HomeModule {}
