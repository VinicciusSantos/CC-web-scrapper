import { Component, EventEmitter, Output, Input } from '@angular/core';
import CoursesRepository from '../../repositories/courses-repository/coursesRepository.service';
import Course from '../../../../../entities/courses';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss'],
})
export class CardActionsComponent {
  @Input() public course!: Course;
  @Output() public onReload = new EventEmitter<void>();

  constructor(private router: Router) {}

  public onDownloadData() {
    this.router.navigate([`/home`, this.course.id]);
  }
}
