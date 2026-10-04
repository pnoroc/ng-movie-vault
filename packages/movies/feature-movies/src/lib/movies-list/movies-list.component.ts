import { Component, inject, input, InputSignal, output } from '@angular/core';
import { MoviesListCardComponent } from '@org/mv-feature-movie-ui';
import { Movie } from '@org/movies-models';
import { MoviesService, TMDB_CONFIG } from '@org/mv-movies-data';

@Component({
  selector: 'mv-movies-list',
  imports: [MoviesListCardComponent],
  templateUrl: './movies-list.component.html',
})
export class MoviesListComponent {
  private readonly moviesService = inject(MoviesService);

  movies: InputSignal<Movie[] | undefined> = input<Movie[] | undefined>([]);
  genres = this.moviesService.genres;
  imageUrl = inject(TMDB_CONFIG).imageUrl;

  cardClick = output<Movie>();

  handleCardClick(movie: Movie): void {
    this.cardClick.emit(movie);
  }
}
