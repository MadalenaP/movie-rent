import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { IRental } from '../../interfaces/IRental';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSort, MatSortModule],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.scss'
})
export class RentalsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected rentals: IRental[];
  protected rentalDataSource: MatTableDataSource<IRental>;
  protected paginatorConfig = {
    listSize: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 100]
  };
  protected isLoading: boolean = false;
  displayedColumns: string[] = ['movie', 'rental_date', 'return_date', 'is_paid', 'charge', 'actions'];


  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.getRentals(0, this.paginatorConfig.pageSize);
  }

  ngAfterViewInit() {
   // this.rentalDataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getRentals(pageIndex: number, pageSize: number): void {
    this.isLoading = true;
    this.moviesService.getRentals(pageIndex + 1, pageSize).pipe(
      tap((result) => {
        this.rentals = result.results;
        this.rentalDataSource = new MatTableDataSource<IRental>(this.rentals);
        this.rentalDataSource.paginator = this.paginator;
        this.rentalDataSource.sort = this.sort;
        this.paginatorConfig.listSize = result.count;
        this.isLoading = false;
        console.log('rentals', this.rentals)
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}

