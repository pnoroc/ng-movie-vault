import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  output,
} from '@angular/core';
import { Movie } from '@org/movies-models';
import { DatePipe } from '@angular/common';
import { MoviesService } from '@org/mv-movies-data';
import { MoviePosterComponent } from '../movie-poster/movie-poster.component';

@Component({
  selector: 'mv-movies-list-card',
  imports: [DatePipe, MoviePosterComponent],
  templateUrl: './movies-list-card.component.html',
  styleUrl: './movies-list-card.component.scss',
})
export class MoviesListCardComponent {
  private readonly moviesService = inject(MoviesService);

  movie: InputSignal<Movie> = input.required<Movie>();
  cardClick = output<void>();

  genreNames = computed(() => {
    if (this.movie()?.genre_ids?.length) {
      return this.moviesService.genres()?.find((genre) => this.movie().genre_ids?.includes(genre.id))?.name;
    }

    return '';
  });
}
