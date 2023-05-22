import { NgModule } from '@angular/core';
import { ClickAwayDirective } from './click-away/click-away.directive';

@NgModule({
  declarations: [ClickAwayDirective],
  exports: [ClickAwayDirective],
})
export class DirectivesModule {}