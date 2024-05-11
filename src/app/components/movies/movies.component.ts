import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { IMovie } from '../../interfaces/IMovie';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MovieListItemComponent } from '../movie-list-item/movie-list-item.component';
import { Router } from '@angular/router';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MatPaginatorModule, MovieListItemComponent, LoadingIndicatorComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected movies: IMovie[];
  protected paginatorConfig = {
    listSize: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 100]
  };
  protected isLoading: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies(0, this.paginatorConfig.pageSize);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getMovies(pageIndex: number, pageSize: number): void {
    this.isLoading = true;
    this.moviesService.getMovies(pageIndex + 1, pageSize).pipe(
      tap((result) => {
        this.movies = result.results;
        this.paginatorConfig.listSize = result.count;
        this.isLoading = false;
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public handlePaginatorChange(event: PageEvent): void {
    this.getMovies(event.pageIndex, event.pageSize);
  }

  public goToMovie(movieId: string) {
    this.router.navigate(['/movies/' + movieId]);
  }
}
