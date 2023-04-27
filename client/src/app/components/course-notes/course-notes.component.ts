import { Component } from '@angular/core';
import {
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';

interface NotesTableRow {
  unidade: string;
  media: number;
  tentativas: number;
  concluido?: boolean;
}

@Component({
  selector: 'app-course-notes',
  templateUrl: './course-notes.component.html',
  styleUrls: ['./course-notes.component.scss'],
})
export class CourseNotesComponent {
  customColumn = 'unidade';
  defaultColumns = ['media', 'tentativas', 'concluido'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<NotesTableRow>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<NotesTableRow>) {
    this.dataSource = this.dataSourceBuilder.create(
      this.data.map((data) => {
        return { data };
      })
    );
  }

  private data: NotesTableRow[] = [
    {
      unidade: 'Unidade 1',
      media: 4.5,
      concluido: false,
      tentativas: 2,
    },
    {
      unidade: 'Unidade 2',
      media: 8.0,
      concluido: true,
      tentativas: 3,
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }
}
