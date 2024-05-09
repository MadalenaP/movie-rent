import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'movies', component: MoviesComponent}
];
