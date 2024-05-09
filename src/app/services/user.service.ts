import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ILoginData } from '../interfaces/ILoginData';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public login(loginData: ILoginData): Observable<ILoginResponse> {
    console.log('loginData', loginData)
    return this.http.post<ILoginResponse>('/api/auth/login/', loginData);
  }
}
