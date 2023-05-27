import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TabProps } from '../tab/tab.component';
// import { StudentEntity } from 'src/app/domain/entities';

// import { KeyboardAction } from './../../infra/services/keyboard-service/KeyboardService';

export type SidebarState = 'closed' | 'open';
export type TabInput = Omit<TabProps, 'active' | 'size'>;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() title = 'UNIP Web Scrapper';
  @Input() state: SidebarState = 'open';
  @Input() tabs: TabInput[] = [
    {
      icon: 'home',
      label: 'Home',
      redirectTo: '/home',
    },
  ];

  // public user!: StudentEntity;

  constructor(private router: Router) {}

  public get isSidebarOpen(): boolean {
    if (!this.state) this.state = 'open';
    return this.state === 'open';
  }

  public get tabSize(): TabProps['size'] {
    if (this.isSidebarOpen) return 'full';
    return 'small';
  }

  public isTabActive(tabRoute: string): boolean {
    return tabRoute === this.router.url;
  }

  public changeSidebarState = () => {
    if (this.isSidebarOpen) this.state = 'closed';
    else this.state = 'open';
  };

  // public keyboardShortcuts: KeyboardAction[] = [
  //   {
  //     key: 's',
  //     action: this.changeSidebarState,
  //     freezeInOverlay: true,
  //   },
  // ];

  public onLogout(): void {
    // this.localAuthService.logout();
    this.router.navigate(['/']);
  }

  public ngOnInit(): void {
    // this.keyboardService.setActions(this.keyboardShortcuts);
    // this.keyboardService.initActions();
  }

  public ngOnDestroy(): void {
    // this.keyboardService.endActions();
  }
}
