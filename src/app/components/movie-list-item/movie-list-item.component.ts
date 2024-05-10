import { Component, Input } from '@angular/core';
import { IMovie } from '../../interfaces/IMovie';

@Component({
  selector: 'app-movie-list-item',
  standalone: true,
  imports: [],
  templateUrl: './movie-list-item.component.html',
  styleUrl: './movie-list-item.component.scss'
})
export class MovieListItemComponent {
  @Input() movieDetails: IMovie;

}
