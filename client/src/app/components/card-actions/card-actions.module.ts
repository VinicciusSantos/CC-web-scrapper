import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardActionsComponent } from './card-actions.component';
import { NbButtonModule, NbIconModule, NbTooltipModule } from '@nebular/theme';

@NgModule({
  declarations: [CardActionsComponent],
  imports: [CommonModule, NbTooltipModule, NbButtonModule, NbIconModule],
  exports: [CardActionsComponent],
})
export class CardActionsModule {}
