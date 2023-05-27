import { Component, Input } from '@angular/core';

export interface TabProps {
  label: string;
  icon: string;
  active: boolean;
  size: 'small' | 'full';
  redirectTo: string;
}

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Input() label: string = '';
  @Input() icon!: string;
  @Input() active = false;
  @Input() redirectTo!: string;
  @Input() size: TabProps['size'] = 'full';

  public get iconSize(): number {
    return this.inFullSize ? 25 : 18;
  }

  public get inFullSize(): boolean {
    return this.size === 'full';
  }
}