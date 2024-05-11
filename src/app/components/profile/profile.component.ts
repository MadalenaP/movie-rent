import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Subject, Observable, takeUntil, tap } from 'rxjs';
import { IProfile } from '../../interfaces/IProfile';
import { UserState } from '../../state-management/user/user.state';
import { AsyncPipe, CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, UpperCasePipe, CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Select(UserState.userProfile) userProfile$: Observable<IProfile>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected profileData: IProfile;

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
}
