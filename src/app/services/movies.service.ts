import { Injectable } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMovieListResponse } from '../interfaces/IMovieListResponse';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  constructor(private http: HttpClient) { }

  public getMovies(page: number, pageSize: number): Observable<IMovieListResponse> {
    return this.http.get<IMovieListResponse>(`/api/rent-store/movies/?page=${page}&page_size=${pageSize}`);
  }

  public getMovieById(movieId: number): Observable<IMovie> {
    return this.http.get<IMovie>(`/api/rent-store/movies/${movieId}`);
  }
}
