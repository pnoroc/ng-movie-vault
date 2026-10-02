import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { Movie } from '@org/movies-models';
import { TMDB_CONFIG } from '@org/mv-movies-data';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'mv-movie-poster',
  templateUrl: './movie-poster.component.html',
  imports: [NgOptimizedImage, DecimalPipe],
  styleUrls: ['./movie-poster.component.scss'],
})
export class MoviePosterComponent {
  private readonly baseImageUrl = inject(TMDB_CONFIG).imageUrl;

  movie: InputSignal<Movie | undefined> = input();

  posterUrl = computed(() => {
    if (!this.movie()?.poster_path) {
      return '';
    }
    return this.baseImageUrl + this.movie()?.poster_path;
  });
}
