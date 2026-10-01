import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListCardComponent } from './movies-list-card.component';

describe('MvFeatureMovies', () => {
  let component: MoviesListCardComponent;
  let fixture: ComponentFixture<MoviesListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesListCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
