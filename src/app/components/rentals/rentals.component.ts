import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, catchError, of, takeUntil, tap } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { IRental } from '../../interfaces/IRental';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import { GetProfile } from '../../state-management/user/user.actions';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSort, MatSortModule],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.scss'
})
export class RentalsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected rentals: IRental[];
  protected rentalDataSource: MatTableDataSource<IRental>;
  protected paginatorConfig = {
    pageIndex: 0,
    listSize: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 100]
  };
  protected isLoading: boolean = false;
  displayedColumns: string[] = ['movie', 'rental_date', 'return_date', 'is_paid', 'charge', 'actions'];


  constructor(
    private moviesService: MoviesService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getRentals();
  }

  ngAfterViewInit() {
    // this.rentalDataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getRentals(): void {
    this.isLoading = true;
    this.moviesService.getRentals(this.paginatorConfig.pageIndex + 1, this.paginatorConfig.pageSize).pipe(
      tap((result) => {
        this.rentals = result.results;
        this.rentalDataSource = new MatTableDataSource<IRental>(this.rentals);
        this.rentalDataSource.sort = this.sort;
        this.paginatorConfig.listSize = result.count;
        this.isLoading = false;
        console.log('rentals', this.rentals)
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public handlePaginatorChange(event: PageEvent): void {
    this.paginatorConfig.pageSize = event.pageSize;
    this.paginatorConfig.pageIndex = event.pageIndex;
    this.getRentals();
  }

  public returnMovie(movieId: string): void {
    this.moviesService.returnMovie(movieId).pipe(
      catchError((err) => of(err)), //show some error to the user
      tap(() => {
        this.getRentals();
        this.store.dispatch(new GetProfile);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}

