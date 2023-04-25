import { Component } from '@angular/core';
import {
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
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

  dataSource: NbTreeGridDataSource<FSEntry>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  private data: TreeNode<FSEntry>[] = [
    {
      data: {
        unidade: 'Unidade 1',
        media: 4.5,
        concluido: false,
        tentativas: 2,
      },
    },
    {
      data: {
        unidade: 'Unidade 2',
        media: 8.0,
        concluido: true,
        tentativas: 3,
      },
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }
}
