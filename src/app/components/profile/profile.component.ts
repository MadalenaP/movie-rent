import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Subject, Observable, takeUntil, tap } from 'rxjs';
import { IProfile } from '../../interfaces/IProfile';
import { UserState } from '../../state-management/user/user.state';
import { AsyncPipe, CurrencyPipe, UpperCasePipe } from '@angular/common';
import {  MatDialog } from '@angular/material/dialog';
import { BalanceDialogComponent } from '../balance-dialog/balance-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, UpperCasePipe, CurrencyPipe, TranslateModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Select(UserState.userProfile) userProfile$: Observable<IProfile>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected profileData: IProfile;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProfileData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getProfileData(): void {
    this.userProfile$.pipe(
      tap((profileData) => this.profileData = profileData),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public updateBalance(): void {
    this.dialog.open(BalanceDialogComponent, {data: this.profileData.wallet});
  }
}
