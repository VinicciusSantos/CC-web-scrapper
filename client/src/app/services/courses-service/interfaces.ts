import { Observable } from 'rxjs';
import Course from '../../domain/entities/courses';
import { ResponseInterfaces } from 'src/app/infra/http/interfaces';
import { NotesTableRow } from '../../domain/entities/notes';
import { CoursePageLink, GetCourseLinksOutput } from '../../domain/entities/courseLinks';

export namespace CourseInterfaces {
  export class getAll {
    public courses!: Course[];
  }

  export class getCourseGrades {
    public grades!: NotesTableRow[];
  }

  export class downloadCourseData {
    links!: {
      url: string;
      type?: any;
    }[];
  }
  export class CourseLinks {
    public links!: GetCourseLinksOutput;
    public course!: Course;
  }
}

export type GetAllCoursesReponse = Observable<
  ResponseInterfaces.Get<CourseInterfaces.getAll>
>;

export type GetCourseGradesReponse = Observable<
  ResponseInterfaces.Get<CourseInterfaces.getCourseGrades>
>;

export type DownloadCourseDataReponse = Observable<
  ResponseInterfaces.Get<CourseInterfaces.downloadCourseData>
>;

export type CourseLinksReponse = Observable<
  ResponseInterfaces.Get<CourseInterfaces.CourseLinks>
>;
