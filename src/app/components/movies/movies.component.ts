import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {

  constructor(private moviesService: MoviesService) {}
ngOnInit(): void {
this.moviesService.getMovies(1, 20).subscribe(res => [
  console.log('res', res)
])
}
}
