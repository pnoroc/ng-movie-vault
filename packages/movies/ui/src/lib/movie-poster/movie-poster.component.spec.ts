import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviePosterComponent } from './movie-poster.component';

describe('MoviePosterComponent', () => {
  let component: MoviePosterComponent;
  let fixture: ComponentFixture<MoviePosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviePosterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviePosterComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('imageUrl', 'https://img.test');
  });

  it('should build the poster url from the image base url', async () => {
    fixture.componentRef.setInput('movie', { id: 1, poster_path: '/poster.jpg' });
    await fixture.whenStable();

    expect(component.posterUrl()).toBe('https://img.test/poster.jpg');
    expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
  });

  it('should not render an image when there is no poster', async () => {
    fixture.componentRef.setInput('movie', { id: 1 });
    await fixture.whenStable();

    expect(component.posterUrl()).toBe('');
    expect(fixture.nativeElement.querySelector('img')).toBeNull();
  });
});
