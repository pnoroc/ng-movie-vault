import { computed, inject, Injectable, signal } from '@angular/core';
import {
  HttpClient,
  httpResource,
  HttpResourceRef,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieHttpResponse } from '@org/movies-models';
import { MovieGenre } from '@org/movies-models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly http = inject(HttpClient);

  page = signal<number>(1);
  search = signal<string | undefined>(undefined);

  moviesResource: HttpResourceRef<MovieHttpResponse | undefined> = httpResource<
    MovieHttpResponse | undefined
  >(() => `${this.baseUrl}/movie/popular?page=${this.page()}`);

  searchMoviesResource = httpResource<MovieHttpResponse | undefined>(
    () => `${this.baseUrl}/search/movie?query=${this.search()}`
  );

  movies = computed(() => {
    return !!this.search() ? this.searchMoviesResource.value()?.results : this.moviesResource.value()?.results;
  });

  genresResource = httpResource<
    (MovieHttpResponse & { genres: MovieGenre[] }) | undefined
  >(() => `${this.baseUrl}/genre/movie/list`);
  genres = computed(() => this.genresResource.value()?.genres);

  setNextPage() {
    this.page.update((page) => page + 1);
  }

  setPreviousPage() {
    this.page.update((page) => (page - 1 > 0 ? page - 1 : 1));
  }

  setSearchQuery(query: string = '') {
    this.search.set(query);
  }

  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}`);
  }
}
