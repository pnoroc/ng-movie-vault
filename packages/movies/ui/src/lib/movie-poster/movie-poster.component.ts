import { Component, computed, input, InputSignal } from '@angular/core';
import { Movie } from '@org/movies-models';
import { NgOptimizedImage } from '@angular/common';
import { RatingBadgeComponent } from '../rating-badge/rating-badge.component';

@Component({
  selector: 'mv-movie-poster',
  templateUrl: './movie-poster.component.html',
  imports: [NgOptimizedImage, RatingBadgeComponent],
})
export class MoviePosterComponent {
  movie: InputSignal<Movie | undefined> = input();
  imageUrl = input(''); // Base url the movie poster path is appended to.

  posterUrl = computed(() => {
    if (!this.movie()?.poster_path) {
      return '';
    }
    return this.imageUrl() + this.movie()?.poster_path;
  });
}
