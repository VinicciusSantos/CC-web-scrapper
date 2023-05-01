import { Observable } from 'rxjs';
import Course from '../../../../../entities/courses';
import { ResponseInterfaces } from 'src/app/infra/http/interfaces';
import { NotesTableRow } from '../../../../../entities/notes';

export namespace CourseInterfaces {
  export class getAll {
    public courses!: Course[];
  }

  export class getCourseGrades {
    public grades!: NotesTableRow[];
  }
}

export type GetAllCoursesReponse = Observable<
  ResponseInterfaces.Get<CourseInterfaces.getAll>
>;

export type GetCourseGradesReponse = Observable<
  ResponseInterfaces.Get<CourseInterfaces.getCourseGrades>
>;