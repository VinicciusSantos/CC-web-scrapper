import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginRoutingModule } from './home-routing.module';
import { NbLayoutModule } from '@nebular/theme';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, NbLayoutModule],
  exports: [LoginRoutingModule],
})
export class HomeModule {}
