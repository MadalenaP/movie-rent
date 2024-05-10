import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, switchMap, takeUntil, tap } from 'rxjs';
import { IMovie } from '../../interfaces/IMovie';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected movie: IMovie;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMovieDetails();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getMovieDetails(): void {
    this.route.params.pipe(
      filter((params) => params['id']),
      switchMap((params) =>
        this.moviesService.getMovieById(params['id'])
      ),
      tap((movie) => this.movie = movie),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
