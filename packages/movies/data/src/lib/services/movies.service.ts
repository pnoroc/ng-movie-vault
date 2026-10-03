import { computed, effect, inject, Injectable, signal } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  httpResource,
  HttpResourceRef,
} from '@angular/common/http';
import { finalize, Observable, take } from 'rxjs';
import {
  Movie,
  MovieGenre,
  MovieGenresHttpResponse,
  MovieHttpResponse,
} from '@org/movies-models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly http = inject(HttpClient);

  page = signal<number>(1);
  movies = signal<Movie[]>([]);
  isLoading = signal<boolean>(false);
  httpError = signal<unknown>(null); // consider moving to a global error handler

  constructor() {
    effect(() => {
      this.getPopularMovies(this.page());
    });
  }

  genresResource = httpResource<MovieGenresHttpResponse | undefined>(
    () => `${this.baseUrl}/genre/movie/list`,
  );
  genres = computed(() => this.genresResource.value()?.genres);

  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}`);
  }

  getPopularMovies(page: number) {
    const params = new HttpParams({
      fromObject: { page },
    });
    this.isLoading.set(true);

    return this.http
      .get<MovieHttpResponse>(`${this.baseUrl}/movie/popular`, { params })
      .pipe(
        take(1),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (response: MovieHttpResponse) => {
          this.movies.update((movies) => [...movies, ...response.results]);
        },
        error: (err) => this.httpError.set(err),
      });
  }

  searchMovies(query: string = '') {
    this.isLoading.set(true);

    return this.http
      .get(`${this.baseUrl}/search/movie?query=${query}`)
      .pipe(finalize(() => this.isLoading.set(false)));
  }

  showMore() {
    this.page.update((page) => page + 1);
  }
}
