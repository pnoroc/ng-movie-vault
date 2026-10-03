import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { Movie } from '@org/movies-models';
import { TMDB_CONFIG } from '@org/mv-movies-data';
import { NgOptimizedImage } from '@angular/common';
import { RatingBadgeComponent } from '../rating-badge/rating-badge.component';

@Component({
  selector: 'mv-movie-poster',
  templateUrl: './movie-poster.component.html',
  imports: [NgOptimizedImage, RatingBadgeComponent],
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
