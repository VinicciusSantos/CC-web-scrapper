import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss'],
})
export class CardActionsComponent {
  @Output() public onReload = new EventEmitter<void>();
  @Output() public onDownload = new EventEmitter<void>();
}
