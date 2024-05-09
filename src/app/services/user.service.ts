import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginData } from '../interfaces/ILoginData';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserStateModel } from '../state-management/user/user.state';
import { SetUserData } from '../state-management/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private store: Store, 
    private router: Router
  ) { }

  public login(loginData: ILoginData): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('/api/auth/login/', loginData);
  }

  public logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('refresh_token');
    this.updateState();
    this.router.navigate(['/login']);
  }


  private updateState(): void {
    const payload: UserStateModel = {
      username: null,
      isAuthenticated: false,
      userId: null,
      isAdmin: false
    };
    this.store.dispatch(new SetUserData(payload));
  }
}
