import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { SearchAutocompleteComponent } from '@org/mv-feature-movie-ui';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { MoviesService } from '@org/mv-movies-data';
import { Movie } from '@org/movies-models';

@Component({
  selector: 'mv-movies-page',
  imports: [SearchAutocompleteComponent, MoviesListComponent],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss',
})
export class MoviesPageComponent {
  protected readonly moviesService = inject(MoviesService);

  movies: Signal<Movie[] | undefined> = this.moviesService.movies;

  nextPage() {
    this.moviesService.setNextPage();
  }
  previousPage() {
    this.moviesService.setPreviousPage();
  }
}
