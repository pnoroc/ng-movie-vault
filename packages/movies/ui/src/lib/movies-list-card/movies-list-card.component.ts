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

  cardClick = output<void>();

  genreNames = computed(() => {
    if (this.movie()?.genre_ids?.length) {
      return this.genres()?.find((genre) =>
        this.movie().genre_ids?.includes(genre.id),
      )?.name;
    }

    return '';
  });
}
