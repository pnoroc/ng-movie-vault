import { Component, computed, input, InputSignal, output } from '@angular/core';
import { Movie, MovieGenre } from '@org/movies-models';
import { DatePipe } from '@angular/common';
import { MoviePosterComponent } from '../movie-poster/movie-poster.component';

@Component({
  selector: 'mv-movies-list-card',
  imports: [DatePipe, MoviePosterComponent],
  templateUrl: './movies-list-card.component.html',
})
export class MoviesListCardComponent {
  movie: InputSignal<Movie> = input.required<Movie>();
  genres: InputSignal<MovieGenre[] | undefined> = input<MovieGenre[]>();
  imageUrl = input('');

  cardClick = output<void>();

  /** The movie's primary genre, i.e. the first of its genre ids. */
  genreName = computed(() => {
    const primaryGenreId = this.movie().genre_ids?.[0];
    return this.genres()?.find((genre) => genre.id === primaryGenreId)?.name ?? '';
  });
}
