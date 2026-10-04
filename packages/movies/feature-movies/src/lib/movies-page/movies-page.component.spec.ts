import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MoviesService, TMDB_CONFIG } from '@org/mv-movies-data';
import { MoviesPageComponent } from './movies-page.component';

describe('MoviesPageComponent', () => {
  let component: MoviesPageComponent;
  let fixture: ComponentFixture<MoviesPageComponent>;

  const router = { navigate: vi.fn() };
  const moviesService = {
    movies: signal([]),
    genres: signal([]),
    query: signal(''),
    loading: signal(false),
    error: signal<string | null>(null),
    hasMore: signal(false),
    isEmpty: signal(false),
    loadMore: vi.fn(),
    searchMovies: vi.fn(),
    getPopularMovies: vi.fn(),
    retry: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    moviesService.query.set('');
    moviesService.error.set(null);

    await TestBed.configureTestingModule({
      imports: [MoviesPageComponent],
      providers: [
        { provide: MoviesService, useValue: moviesService },
        { provide: Router, useValue: router },
        { provide: TMDB_CONFIG, useValue: { imageUrl: 'https://img.test' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  const heading = () => fixture.nativeElement.querySelector('h1').textContent;

  it('should show the popular heading without a query', () => {
    expect(heading()).toContain('Popular Movies');
  });

  it('should show the search heading with a query', async () => {
    moviesService.query.set('matrix');
    await fixture.whenStable();

    expect(heading()).toContain('Results for “matrix”');
  });

  it('should delegate search and load more to the service', () => {
    component.searchMovies('alien');
    component.showMoreMovies();

    expect(moviesService.searchMovies).toHaveBeenCalledWith('alien');
    expect(moviesService.loadMore).toHaveBeenCalled();
  });

  it('should reload popular movies on clear only when a search is active', () => {
    component.clearSearch();
    expect(moviesService.getPopularMovies).not.toHaveBeenCalled();

    moviesService.query.set('alien');
    component.clearSearch();
    expect(moviesService.getPopularMovies).toHaveBeenCalled();
  });

  it('should show the error box and retry the failed request', async () => {
    moviesService.error.set('Failed');
    await fixture.whenStable();

    fixture.nativeElement.querySelector('mv-error-box button').click();

    expect(moviesService.retry).toHaveBeenCalled();
  });

  it('should navigate to the movie details', () => {
    component.showMovieDetails({ id: 5 });

    expect(router.navigate).toHaveBeenCalledWith(['/movies', 5]);
  });
});
