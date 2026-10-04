import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TMDB_CONFIG } from '@org/mv-movies-data';
import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [
        provideRouter([]),
        { provide: TMDB_CONFIG, useValue: { imageUrl: 'https://img.test' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movie', {
      id: 1,
      title: 'Alien',
      overview: 'In space no one can hear you scream.',
      genres: [
        { id: 1, name: 'Horror' },
        { id: 2, name: 'Sci-Fi' },
      ],
    });
    await fixture.whenStable();
  });

  it('should map the genre names', () => {
    expect(component.genres()).toEqual(['Horror', 'Sci-Fi']);
  });

  it('should render the movie details', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Alien');
    expect(text).toContain('In space no one can hear you scream.');
    expect(text).toContain('Horror, Sci-Fi');
  });
});
