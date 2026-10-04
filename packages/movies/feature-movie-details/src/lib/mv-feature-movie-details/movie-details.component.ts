import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '@org/movies-models';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MoviePosterComponent } from '@org/mv-feature-movie-ui';
import { TMDB_CONFIG } from '@org/mv-movies-data';

@Component({
  selector: 'mv-feature-movie-details',
  imports: [RouterLink, DatePipe, MoviePosterComponent, DecimalPipe],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  movie: InputSignal<Movie | undefined> = input<Movie | undefined>();
  imageUrl = inject(TMDB_CONFIG).imageUrl;
  genres = computed(() => this.movie()?.genres?.map((genre) => genre.name));
}
