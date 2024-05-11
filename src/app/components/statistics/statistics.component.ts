import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { IMovie } from '../../interfaces/IMovie';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NgxChartsModule],
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
    let count =0;
    this.moviesService.getMovies(1, 200).pipe(
      tap((response) => {
        count = response.count;
        this.mapData(response.results);
      }),
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
    this.isReady = true
    console.log('mapped', this.chartData);
  }

}
