import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginData } from '../interfaces/ILoginData';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserStateModel } from '../state-management/user/user.state';
import { SetIsAdmin, SetIsAuthenticated, SetUserData, SetUserId } from '../state-management/user/user.actions';
import { DateTime } from 'luxon';
import * as jwt from 'jwt-decode';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private store: Store,
    private router: Router,
    private localStorageService: LocalstorageService
  ) { }

  public login(loginData: ILoginData): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('/api/auth/login/', loginData);
  }

  public logout(): void {
    this.localStorageService.removeItem('id_token');
    this.localStorageService.removeItem('expires_at');
    this.localStorageService.removeItem('refresh_token');
    this.resetState();
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return this.localStorageService.getItem('expires_at') && DateTime.now() < this.getExpiration();
  }

  public setUpSession(authResult: ILoginResponse): void {
    const expiresAt = DateTime.now().plus({milliseconds: jwt.jwtDecode(authResult.access)['exp']});
    this.localStorageService.setItem('id_token', authResult.access);
    this.localStorageService.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    this.localStorageService.setItem('refresh_token', authResult.refresh);
  }

  private getExpiration(): DateTime {
    const expiration = this.localStorageService.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return DateTime.fromMillis(expiresAt);
  }

  private resetState(): void {
    const payload: UserStateModel = {
      username: null,
      isAuthenticated: false,
      userId: null,
      isAdmin: false
    };
    this.store.dispatch(new SetUserData(payload));
  }

 
  public updateState(authToken: string): void {
    this.store.dispatch(new SetIsAuthenticated(true));
    this.store.dispatch(new SetUserId(jwt.jwtDecode(authToken)['user_id']));
    this.store.dispatch(new SetIsAdmin(jwt.jwtDecode(authToken)['is_admin']));
  }
}
