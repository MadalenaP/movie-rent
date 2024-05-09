import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import * as jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private localStorageService: LocalstorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.localStorageService.getItem('id_token');

    //const authToken =jwt.jwtDecode(this.localStorageService.getItem('id_token'))['jti'] ;
    console.log('in')
    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(authReq);
    }
    // If there is no token, pass the original request
    return next.handle(req);
  }
}
