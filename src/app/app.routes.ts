import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { AuthGuard } from './services/auth-guard.service';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

export const routes: Routes = [
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
  }
];
