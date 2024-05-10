import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Select } from '@ngxs/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { UserState } from '../../state-management/user/user.state';
import { AsyncPipe } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { INavItem } from '../../interfaces/INavItem';
import { AmdinNav, UserNav } from '../../configs/navigation';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, MatMenuModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  @Select(UserState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  @Select(UserState.isAdmin) isAdmin$: Observable<boolean>;
  protected navItems: INavItem[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.setNavItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private setNavItems(): void {
    this.isAdmin$.pipe(
      tap((isAdmin) => this.navItems = isAdmin ? AmdinNav : UserNav),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public logout(): void {
    this.userService.logout();
  }
}
