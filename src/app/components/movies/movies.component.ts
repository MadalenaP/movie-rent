import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { IMovie } from '../../interfaces/IMovie';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MatPaginatorModule],
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

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getMovies(0, this.paginatorConfig.pageSize);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public handlePaginatorChange(event: PageEvent): void {
    this.getMovies(event.pageIndex, event.pageSize);
  }

  private getMovies(pageIndex: number, pageSize: number): void {
    this.moviesService.getMovies(pageIndex + 1, pageSize).pipe(
      tap((result) => {
        this.movies = result.results;
        this.paginatorConfig.listSize = result.count;
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
