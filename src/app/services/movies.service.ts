import { Injectable } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMovieListResponse } from '../interfaces/IMovieListResponse';
import { IRentalResponse } from '../interfaces/IRentalResponse';
import { IRentalPartial } from '../interfaces/IRental';
import { ICategory } from '../interfaces/ICategory';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  constructor(private http: HttpClient, private userService: UserService) { }

  public getMovies(page: number, pageSize: number): Observable<IMovieListResponse> {
    return this.http.get<IMovieListResponse>(`/api/rent-store/movies/?page=${page}&page_size=${pageSize}`)
    .pipe(catchError(this.handleError<IMovieListResponse>('get movies')));
  }

  public getMovieById(movieId: number): Observable<IMovie> {
    return this.http.get<IMovie>(`/api/rent-store/movies/${movieId}`)
    .pipe(catchError(this.handleError<IMovie>('get movie')));
  }

  public getRentals(page: number, pageSize: number): Observable<IRentalResponse> {
    return this.http.get<IRentalResponse>(`/api/rent-store/rentals/?page=${page}&page_size=${pageSize}`)
    .pipe(catchError(this.handleError<IRentalResponse>('get rentals')));
  }

  public rentMovie(movieId: string): Observable<IRentalPartial> {
    const body = {movie: movieId};
    return this.http.post<IRentalPartial>(`/api/rent-store/rentals/`, body)
    .pipe(catchError(this.handleError<IRentalPartial>('get rental')));
  }

  public returnMovie(movieId: string): Observable<string> {
    return this.http.patch<string>(`/api/rent-store/rentals/${movieId}`, {})
    .pipe(catchError(this.handleError<string>('return movie')));
  }

  public getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`/api/rent-store/categories`)
    .pipe(catchError(this.handleError<ICategory[]>('get categories')));
  }

  public addMovie(movie: IMovie): Observable<IMovie>{
    return this.http.post<IMovie>(`/api/rent-store/movies/`, movie)
    .pipe(catchError(this.handleError<IMovie>('add movie')));
  }


  private handleError<T>(operation?: string): (error: any) => Observable<T> {
    return (error: any): any => {
      console.log('Error:' + operation);
      this.userService.logout();
      return of(error as Observable<any>);
    };
  }
}
