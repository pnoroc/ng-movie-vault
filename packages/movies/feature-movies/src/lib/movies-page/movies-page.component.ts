import { Component, inject, OnInit, signal } from '@angular/core';
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
export class MoviesPageComponent implements OnInit {
  private readonly moviesService = inject(MoviesService);

  movies = signal<Movie[]>([]);

  ngOnInit(): void {
    this.moviesService.getRatedMovies().subscribe((r) => {
      this.movies.set(r);
      console.log(r);

    });
  }
}
