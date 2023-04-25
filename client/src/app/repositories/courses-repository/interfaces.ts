import { Observable } from 'rxjs';
import Course from '../../../../../entities/courses';
import { ResponseInterfaces } from 'src/app/infra/http/interfaces';

export namespace CourseInterfaces {
  export class getAll {
    public courses!: Course[];
  }
}

export type GetAllCoursesReponse = Observable<
  ResponseInterfaces.Get<CourseInterfaces.getAll>
>;