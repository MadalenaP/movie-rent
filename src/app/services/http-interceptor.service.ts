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
    const id_token = this.localStorageService.getItem('id_token');
    if (id_token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${id_token}`
        }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
