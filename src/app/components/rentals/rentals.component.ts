import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, of, takeUntil, tap } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { IRental } from '../../interfaces/IRental';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Select, Store } from '@ngxs/store';
import { GetProfile } from '../../state-management/user/user.actions';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserState } from '../../state-management/user/user.state';
import { rentalsAdminColumns, rentalsUserColumns } from '../../configs/rentals-table';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSort, MatSortModule, MatCheckboxModule],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.scss'
})
export class RentalsComponent implements OnInit, OnDestroy {
  @Select(UserState.isAdmin) isAdmin$: Observable<boolean>;
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
  protected isAdmin: boolean = false;
  protected displayedColumns: string[] = [];


  constructor(
    private moviesService: MoviesService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getRentals();
    this.getUserRole();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getUserRole(): void {
    this.isAdmin$.pipe(
      tap((isAdmin) => {
        this.isAdmin = isAdmin;
        this.setTableColumns();
      } ),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private setTableColumns(): void {
    this.displayedColumns = this.isAdmin ? rentalsAdminColumns : rentalsUserColumns;
  }

  private getRentals(): void {
    this.isLoading = true;
    this.moviesService.getRentals(this.paginatorConfig.pageIndex + 1, this.paginatorConfig.pageSize).pipe(
      tap((result) => {
        this.rentals = result.results.map((item) => { return {...item, is_active: !item.return_date }});
        this.rentalDataSource = new MatTableDataSource<IRental>(this.rentals);
        this.rentalDataSource.sort = this.sort;
        this.paginatorConfig.listSize = result.count;
        this.isLoading = false;
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

