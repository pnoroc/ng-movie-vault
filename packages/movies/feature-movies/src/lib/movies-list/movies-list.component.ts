import { Component, input, InputSignal } from '@angular/core';
import { MoviesListCardComponent } from '@org/mv-feature-movie-ui';
import { Movie } from '@org/movies-models';

@Component({
  selector: 'mv-movies-list',
  imports: [MoviesListCardComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent {
  movies: InputSignal<Movie[]> = input<Movie[]>([])
}
