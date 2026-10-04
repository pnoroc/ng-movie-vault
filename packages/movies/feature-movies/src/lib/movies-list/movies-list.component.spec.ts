import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesService, TMDB_CONFIG } from '@org/mv-movies-data';
import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesListComponent],
      providers: [
        { provide: MoviesService, useValue: { genres: signal([]) } },
        { provide: TMDB_CONFIG, useValue: { imageUrl: 'https://img.test' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movies', [
      { id: 1, title: 'Alien' },
      { id: 2, title: 'Aliens' },
    ]);
    await fixture.whenStable();
  });

  it('should render a card per movie', () => {
    expect(fixture.nativeElement.querySelectorAll('mv-movies-list-card').length).toBe(2);
  });

  it('should emit cardClick with the clicked movie', () => {
    const spy = vi.fn();
    component.cardClick.subscribe(spy);

    fixture.nativeElement.querySelectorAll('mv-movies-list-card section')[1].click();

    expect(spy).toHaveBeenCalledWith({ id: 2, title: 'Aliens' });
  });
});
