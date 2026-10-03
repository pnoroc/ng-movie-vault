import { Component, computed, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '@org/movies-models';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MoviePosterComponent } from '@org/mv-feature-movie-ui';

@Component({
  selector: 'mv-feature-movie-details',
  imports: [RouterLink, DatePipe, MoviePosterComponent, DecimalPipe],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent {
  movie: InputSignal<Movie | undefined> = input<Movie | undefined>();
  genres = computed(() => this.movie()?.genres?.map((genre) => genre.name));
}
