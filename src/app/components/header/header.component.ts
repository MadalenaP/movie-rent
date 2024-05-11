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
import { availableLanguages } from '../../configs/languages';
import { ILanguage } from '../../interfaces/ILanguage';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, MatMenuModule, RouterLink, RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Select(UserState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  @Select(UserState.isAdmin) isAdmin$: Observable<boolean>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected navItems: INavItem[] = [];
  protected availableLanguages: ILanguage[] = availableLanguages;

  constructor(
    private userService: UserService,
    private translateService: TranslateService
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

  public changeLang(lang: string): void {
    this.translateService.use(lang);
  }
}
