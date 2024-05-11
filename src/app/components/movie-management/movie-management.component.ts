import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { ICategory } from '../../interfaces/ICategory';
import { IMovie } from '../../interfaces/IMovie';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MovieEditDialogComponent } from '../movie-edit-dialog/movie-edit-dialog.component';

@Component({
  selector: 'app-movie-management',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './movie-management.component.html',
  styleUrl: './movie-management.component.scss'
})
export class MovieManagementComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected movies: IMovie[];
  protected paginatorConfig = {
    listSize: 0,
    pageIndex: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 100]
  };
  protected isLoading: boolean = false;
  protected displayedColumns: string[] = ['title', 'actions'];
  protected moviesDataSource: MatTableDataSource<IMovie>;

  constructor(
    public dialog: MatDialog,
    private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMovies();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getMovies(): void {
    this.isLoading = true;
    this.moviesService.getMovies(this.paginatorConfig.pageIndex + 1, this.paginatorConfig.pageSize).pipe(
      tap((result) => {
        this.movies = result.results;
        this.moviesDataSource = new MatTableDataSource<IMovie>(this.movies);
        this.paginatorConfig.listSize = result.count;
        this.isLoading = false;
        console.log('movies', this.movies)
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }


  public handlePaginatorChange(event: PageEvent): void {
    this.paginatorConfig.pageSize = event.pageSize;
    this.paginatorConfig.pageIndex = event.pageIndex;
    this.getMovies();
  }

  public editMovie(movie: IMovie): void {
    const dialogRef = this.dialog.open(MovieEditDialogComponent, {data: movie});
    dialogRef.afterClosed().pipe(
      tap(() => this.getMovies()),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public deleteMovie(movie: IMovie): void {
    alert('Feature coming soon');
  }

  public addMovie(): void {
    const dialogRef = this.dialog.open(MovieEditDialogComponent);
    dialogRef.afterClosed().pipe(
      tap(() => this.getMovies()),
      takeUntil(this.destroy$)
    ).subscribe();
  }

}
