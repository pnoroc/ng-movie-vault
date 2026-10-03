import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { catchError, EMPTY, map, Observable, Subject, switchMap, tap } from 'rxjs';
import {
  Movie,
  MovieGenresHttpResponse,
  MovieHttpResponse,
} from '@org/movies-models';
import { TMDB_CONFIG } from '../tmdb.config';

interface MoviesState {
  movies: Movie[];
  query: string;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

interface MoviesRequest {
  query: string;
  page: number;
}

const initialState: MoviesState = {
  movies: [],
  query: '',
  page: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly http = inject(HttpClient);
  private readonly TMDBbUrl = inject(TMDB_CONFIG).apiUrl;
  private readonly apiUrl = `${this.TMDBbUrl}/3`;

  private readonly state = signal<MoviesState>(initialState);
  private readonly requests = new Subject<MoviesRequest>();

  readonly movies = computed(() => this.state().movies);
  readonly query = computed(() => this.state().query);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly hasMore = computed(() => this.state().page < this.state().totalPages);
  readonly isEmpty = computed(
    () => !this.loading() && !this.error() && this.movies().length === 0,
  );

  private readonly genresResource = httpResource<MovieGenresHttpResponse>(
    () => `${this.apiUrl}/genre/movie/list`,
  );
  readonly genres = computed(() => this.genresResource.value()?.genres ?? []);

  constructor() {
    this.requests
      .pipe(
        tap(({ query }) =>
          this.state.update((state) => ({ ...state, query, loading: true, error: null })),
        ),
        switchMap(({ query, page }) =>
          this.fetchMovies(query, page).pipe(
            map((response) => ({ response, page })),
            catchError(() => {
              this.state.update((state) => ({
                ...state,
                loading: false,
                error: 'Could not load movies. Please try again.',
              }));
              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe(({ response, page }) =>
        this.state.update((state) => ({
          ...state,
          movies: page === 1 ? response.results : [...state.movies, ...response.results],
          page,
          totalPages: response.total_pages ?? page,
          loading: false,
        })),
      );

    this.getPopularMovies();
  }

  getPopularMovies(): void {
    this.requests.next({ query: '', page: 1 });
  }

  /** An empty keyword restores the popular movies list. */
  searchMovies(keyword: string): void {
    const query = keyword.trim();

    if (!query) {
      this.getPopularMovies();
      return;
    }

    this.requests.next({ query, page: 1 });
  }

  loadMore(): void {
    if (this.hasMore() && !this.loading()) {
      this.requests.next({ query: this.query(), page: this.state().page + 1 });
    }
  }

  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}`);
  }

  private fetchPopularMovies(page: number): Observable<MovieHttpResponse> {
    return this.http.get<MovieHttpResponse>(`${this.apiUrl}/movie/popular`, {
      params: { page },
    })
  }

  private fetchMoviesBy(query: string, page: number): Observable<MovieHttpResponse> {
    return this.http.get<MovieHttpResponse>(`${this.apiUrl}/search/movie`, {
      params: { query, page },
    })
  }

  private fetchMovies(query: string, page: number): Observable<MovieHttpResponse> {
    return query ? this.fetchMoviesBy(query, page) : this.fetchPopularMovies(page);
  }
}
