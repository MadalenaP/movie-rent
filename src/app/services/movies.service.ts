import { Injectable } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private options = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  public getMovies<T>(page: number, pageSize: number): Observable<any> {
    return this.http.get<T>(`/api/rent-store/movies/?page=${page}&page_size=${pageSize}`);
  }
}
