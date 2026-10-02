import { Component, inject, input, InputSignal, output } from '@angular/core';
import { MoviesListCardComponent } from '@org/mv-feature-movie-ui';
import { Movie } from '@org/movies-models';
import { Router } from '@angular/router';

@Component({
  selector: 'mv-movies-list',
  imports: [MoviesListCardComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent {
  private readonly router: Router = inject(Router);

  movies: InputSignal<Movie[] | undefined> = input<Movie[] | undefined>([]);
  loadMoreCLick = output<void>();

  showMovieDetails(movie: Movie): void {
    this.router.navigate(['/movies', movie.id]);
  }
}
