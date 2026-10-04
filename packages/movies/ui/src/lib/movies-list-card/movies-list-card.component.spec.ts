import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListCardComponent } from './movies-list-card.component';

describe('MoviesListCardComponent', () => {
  let component: MoviesListCardComponent;
  let fixture: ComponentFixture<MoviesListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesListCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListCardComponent);
    fixture.componentRef.setInput('movie', { id: 1, title: 'Alien', genre_ids: [2] });
    fixture.componentRef.setInput('imageUrl', 'https://img.test');
    fixture.componentRef.setInput('genres', [
      { id: 1, name: 'Comedy' },
      { id: 2, name: 'Horror' },
    ]);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should render the movie title and genre', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Alien');
    expect(text).toContain('Horror');
  });

  it('should return an empty genre name when the movie has no genres', () => {
    fixture.componentRef.setInput('movie', { id: 1, genre_ids: [] });
    expect(component.genreName()).toBe('');
  });

  it('should emit cardClick when clicked', () => {
    const spy = vi.fn();
    component.cardClick.subscribe(spy);

    fixture.nativeElement.querySelector('section').click();

    expect(spy).toHaveBeenCalled();
  });
});
