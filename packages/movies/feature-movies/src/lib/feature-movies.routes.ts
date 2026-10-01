import { Routes } from '@angular/router';
import {MoviesPageComponent} from "./movies-page/movies-page.component";

export const featureMoviesRoutes: Routes = [
  {
    path: '',
    component: MoviesPageComponent,
  },
];
