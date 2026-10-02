import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieHttpResponse } from '@org/movies-models';
import { MovieGenre } from '../../../../models/src/lib/models/movie-genre.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly http = inject(HttpClient);

  page = signal(1);
  search = signal('');


  moviesResource: HttpResourceRef<MovieHttpResponse | undefined> = httpResource<MovieHttpResponse | undefined>(() => `${this.baseUrl}/movie/popular?page=${this.page()}`);
  movies = computed(() => this.moviesResource.value()?.results);
  genresResource = httpResource<MovieHttpResponse & {genres: MovieGenre[]} | undefined>(() => `${this.baseUrl}/genre/movie/list`);
  genres = computed(() => this.genresResource.value()?.genres);

  setNextPage() {
    this.page.update((page) => page + 1);
  }

  setPreviousPage() {
    this.page.update((page) => page - 1 > 0 ? page - 1 : 1);
  }

  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get(
      `${this.baseUrl}/movie/${id}`,
    ) as Observable<Movie>;
  }

  getRatedMovies(): Observable<MovieHttpResponse> {
    return this.http.get(
      `${this.baseUrl}/movie/popular`,
    ) as Observable<MovieHttpResponse>;
  }

  getMovies() {
    return this.http.get(
      `${this.baseUrl}/movie/popular`,
    ) as Observable<MovieHttpResponse>;
  }
}
