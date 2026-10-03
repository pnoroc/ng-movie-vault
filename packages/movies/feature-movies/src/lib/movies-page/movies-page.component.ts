import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { SearchAutocompleteComponent } from '@org/mv-feature-movie-ui';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { MoviesService } from '@org/mv-movies-data';
import { Movie } from '@org/movies-models';
import { Router } from '@angular/router';

@Component({
  selector: 'mv-movies-page',
  imports: [SearchAutocompleteComponent, MoviesListComponent],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss',
})
export class MoviesPageComponent {
  private readonly router = inject(Router);
  private readonly moviesService = inject(MoviesService);

  movies: Signal<Movie[] | undefined> = this.moviesService.movies;

  showMoreMovies() {
    this.moviesService.showMore();
  }

  searchMovies(searchInp: string) {
    // this.moviesService.setSearchQuery(searchInp);
  }

  showMovieDetails(movie: Movie): void {
    this.router.navigate(['/movies', movie.id]);
  }
}
