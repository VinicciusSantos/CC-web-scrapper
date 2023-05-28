import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { finalize, take } from 'rxjs';
import CoursesService from 'src/app/services/courses-service/courses.service';

import { CoursePageLink } from '../../domain/entities/courseLinks';
import Course from '../../domain/entities/courses';

interface ModalConfig {
  loading: boolean;
  state: 'appearing' | 'open' | 'hiding' | 'closed';
  isOpen: boolean;
}

export interface CourseRow extends CoursePageLink {
  checked: boolean;
}

export type LinkTableContent = Record<string, CourseRow[]>;

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss'],
})
export class CourseModalComponent implements OnChanges {
  @Input() public courseId!: string;
  @Input() public isOpen!: boolean;
  @Output() public closeEvent = new EventEmitter<void>();

  public links!: LinkTableContent;
  public submitValue!: LinkTableContent;
  public course!: Course;
  public unidades: string[] = [];
  public modalConfig: ModalConfig = {
    loading: false,
    state: 'closed',
    isOpen: false,
  };

  constructor(private coursesService: CoursesService) {}

  public get formmatedLinks(): any[][] {
    return Object.entries(this.links);
  }

  public onOpenModal(): void {
    this.getDownloadLinks();
    if (this.modalConfig.state === 'open') return;
    this.modalConfig.state = 'appearing';
    setTimeout(() => {
      this.modalConfig.state = 'open';
      this.modalConfig.isOpen = true;
    }, 400);
  }

  public onCloseModal = (): void => {
    if (this.modalConfig.state === 'closed') return;
    this.modalConfig.state = 'hiding';
    setTimeout(() => {
      this.modalConfig.state = 'closed';
      this.modalConfig.isOpen = false;
      this.closeEvent.emit();
    }, 400);
  };

  public getDownloadLinks(): void {
    this.modalConfig.loading = true;
    this.coursesService
      .getCourseLinks(this.courseId)
      .pipe(
        take(1),
        finalize(() => {
          this.modalConfig.loading = false;
        })
      )
      .subscribe((res) => {
        this.unidades = Object.keys(res.data.links);
        let links = res.data.links as LinkTableContent;
        this.unidades.forEach((u) =>
          links[u].forEach((e) => (e.checked = true))
        );
        this.links = links;
        this.course = res.data.course;
      });
  }

  public onSubmit(): void {
    this.modalConfig.loading = true;
    this.submitValue = { ...this.links };
    this.unidades.forEach((uni) => {
      this.submitValue[uni] = this.submitValue[uni].filter(
        (link) => link.checked
      );
      if (this.submitValue[uni].length === 0) delete this.submitValue[uni];
    });
    this.coursesService
      .downloadCourseData(this.course.id, this.submitValue)
      .pipe(take(1))
      .subscribe((res) => {});
    this.onCloseModal();
  }

  public changeCheckboxState(
    event: any,
    unidade: string,
    link: CourseRow
  ): void {
    event.stopPropagation();
    const foundLink = this.links[unidade].find((e) => e === link) as CourseRow;
    foundLink.checked = !foundLink.checked;
  }

  public ngOnChanges(): void {
    this.isOpen ? this.onOpenModal() : this.onCloseModal();
  }
}
