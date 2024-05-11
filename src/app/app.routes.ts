import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { AuthGuard } from './services/auth-guard.service';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AdminGuard } from './services/admin-guard.service';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { MovieManagementComponent } from './components/movie-management/movie-management.component';

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
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'movie-management',
    component: MovieManagementComponent,
    canActivate: [AuthGuard, AdminGuard]
  }

];
