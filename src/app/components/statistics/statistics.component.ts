import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Subject, of, switchMap, takeUntil, tap } from 'rxjs';
import { IMovie } from '../../interfaces/IMovie';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NgxChartsModule, LoadingIndicatorComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit, OnDestroy { 
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected chartData = [];
  protected isReady: boolean = false;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getData(): void {
    this.isReady = false;
    let count = 100;
    // since we don't have the count of the movies, will try with a number and if we see that actual count is larger, we will call again
    this.moviesService.getMovies(1, count).pipe(
      switchMap((response) => {
        if (response.count <= count) {
          return of(response)
        } else {
          return this.moviesService.getMovies(1, response.count);
        }
      }),
      tap((response) => this.mapData(response.results)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private mapData(movies: IMovie[]): void {
    movies.forEach(movie => {
      if (!movie.pub_date) {
        return;
      }
      const index = this.chartData.findIndex(s => s.name === movie.pub_date.toString());
      if (index > -1) {
        this.chartData[index].series[0].y += 1;
        this.chartData[index].series[0].r += 1;
      } else {
        this.chartData.push({
          name: movie.pub_date.toString(),
          series: [
            {
              name: movie.pub_date.toString(),
              x: movie.pub_date.toString(),
              y: 1,
              r: 1
            }
          ]
        });
      }
    });
    this.isReady = true;
  }

}
