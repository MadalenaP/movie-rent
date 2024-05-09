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

  getHttpOptions(options?: any, returnAsArrayBuffer?: boolean) {
    const httpOptions = { ...options }; // ,observe: 'response'
    const headers = {};
    httpOptions.headers = { ...headers, ...(options ? options.headers : {}) };
    httpOptions.responseType = "text";
    httpOptions.observe = "body";
    return httpOptions;
  }
  public login(loginData: ILoginData): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('/api/auth/login/', loginData);
  }
}
