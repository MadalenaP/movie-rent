import { Injectable } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMovieListResponse } from '../interfaces/IMovieListResponse';
import { IRentalResponse } from '../interfaces/IRentalResponse';
import { IRentalPartial } from '../interfaces/IRental';

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

  public getRentals(page: number, pageSize: number): Observable<IRentalResponse> {
    return this.http.get<IRentalResponse>(`/api/rent-store/rentals/?page=${page}&page_size=${pageSize}`);
  }

  public rentMovie(movieId: string): Observable<IRentalPartial> {
    const body = {movie: movieId};
    return this.http.post<IRentalPartial>(`/api/rent-store/rentals/`, body);
  }
}
