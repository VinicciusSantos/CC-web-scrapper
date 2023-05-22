import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { finalize, take } from 'rxjs';
import CoursesRepository from 'src/app/repositories/courses-repository/coursesRepository.service';
import { CoursePageLink } from '../../../../../../entities/courseLinks';

interface ModalConfig {
  courseId: string;
  loading: boolean;
  links: CoursePageLink[];
  state: 'appearing' | 'open' | 'hiding' | 'closed';
  isOpen: boolean;
}

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss'],
})
export class CourseModalComponent implements OnInit {
  public modalConfig: ModalConfig = {
    courseId: '',
    links: [],
    loading: false,
    state: 'closed',
    isOpen: false,
  };

  constructor(
    private coursesRepository: CoursesRepository,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public onOpenModal(): void {
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
      this.router.navigate(['home']);
    }, 400);
  };

  public getDownloadLinks(): void {
    this.modalConfig.loading = true;
    this.coursesRepository
      .getDownloadContent(this.modalConfig.courseId)
      .pipe(
        take(1),
        finalize(() => {
          this.modalConfig.loading = false;
        })
      )
      .subscribe((res) => {
        this.modalConfig.links = res.data.links;
        console.log(
          '🚀 ~ file: course-modal.component.ts:40 ~ CourseModalComponent ~ .subscribe ~ this.modalConfig:',
          this.modalConfig
        );
      });
  }

  private getCourseId(): void {
    this.route.params.subscribe(
      (params) => (this.modalConfig.courseId = params['courseId'])
    );
    console.log(
      "🚀 ~ file: course-modal.component.ts:79 ~ CourseModalComponent ~ getCourseId ~ params['courseId']:",
      this.modalConfig.courseId
    );
  }

  public ngOnInit(): void {
    this.getCourseId();
    this.getDownloadLinks();
    this.onOpenModal();
  }
}
