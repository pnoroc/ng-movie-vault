import { Component, computed, inject, input, InputSignal, output } from '@angular/core';
import { Movie } from '@org/movies-models';
import { DatePipe } from '@angular/common';
import { TMDB_CONFIG } from '@org/mv-movies-data';

@Component({
  selector: 'mv-movies-list-item',
  imports: [DatePipe],
  templateUrl: './movies-list-card.component.html',
  styleUrl: './movies-list-card.component.scss',
})
export class MoviesListCardComponent {
  private readonly baseImageUrl = inject(TMDB_CONFIG).imageUrl;

  movie: InputSignal<Movie | undefined> = input<Movie>();
  cardClick = output<void>();

  posterUrl = computed(() => {
    if (!this.movie()) {
      return '';
    }
    return this.baseImageUrl + this.movie()?.poster_path;
  });
}
