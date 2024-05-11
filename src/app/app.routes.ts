import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { AuthGuard } from './services/auth-guard.service';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RentalsComponent } from './components/rentals/rentals.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  { path: 'login', component: LoginComponent },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'movies/:id',
    component: MovieDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rentals',
    component: RentalsComponent,
    canActivate: [AuthGuard]
  }
];
