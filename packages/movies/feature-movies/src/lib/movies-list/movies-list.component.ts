import { Component, input, InputSignal, output } from '@angular/core';
import { MoviesListCardComponent } from '@org/mv-feature-movie-ui';
import { Movie } from '@org/movies-models';

@Component({
  selector: 'mv-movies-list',
  imports: [MoviesListCardComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent {
  movies: InputSignal<Movie[] | undefined> = input<Movie[] | undefined>([]);

  cardClick = output<Movie>();

  handleCardClick(movie: Movie): void {
    this.cardClick.emit(movie);
  }
}
