import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import Course from '../../../../../entities/courses';

@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss'],
})
export class CardActionsComponent {
  @Input() public course!: Course;

  @Output() public onReload = new EventEmitter<void>();
  @Output() public onDownload = new EventEmitter<string>();

  constructor(private router: Router) {}
}
