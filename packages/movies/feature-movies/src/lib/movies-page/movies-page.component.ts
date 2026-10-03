import { Component, computed, inject } from '@angular/core';
import { ErrorBoxComponent, LoadingPlaceholderComponent, SearchFieldComponent } from '@org/mv-feature-movie-ui';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { MoviesService } from '@org/mv-movies-data';
import { Movie } from '@org/movies-models';
import { Router } from '@angular/router';

@Component({
  selector: 'mv-movies-page',
  imports: [
    SearchFieldComponent,
    MoviesListComponent,
    LoadingPlaceholderComponent,
    ErrorBoxComponent,
  ],
  templateUrl: './movies-page.component.html',
})
export class MoviesPageComponent {
  private readonly router = inject(Router);
  protected readonly moviesService = inject(MoviesService);

  protected readonly heading = computed(() => {
    const query = this.moviesService.query();
    return query ? `Results for “${query}”` : 'Popular Movies';
  });

  showMoreMovies(): void {
    this.moviesService.loadMore();
  }

  searchMovies(searchInp: string): void {
    this.moviesService.searchMovies(searchInp);
  }

  clearSearch(): void {
    // Only reload when a search is active; otherwise keep the already loaded popular pages.
    if (this.moviesService.query()) {
      this.moviesService.getPopularMovies();
    }
  }

  retry(): void {
    this.moviesService.searchMovies(this.moviesService.query());
  }

  showMovieDetails(movie: Movie): void {
    this.router.navigate(['/movies', movie.id]);
  }
}
