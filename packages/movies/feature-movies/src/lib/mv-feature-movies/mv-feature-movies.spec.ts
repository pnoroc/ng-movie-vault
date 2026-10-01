import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MvFeatureMovies } from './mv-feature-movies';

describe('MvFeatureMovies', () => {
  let component: MvFeatureMovies;
  let fixture: ComponentFixture<MvFeatureMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MvFeatureMovies],
    }).compileComponents();

    fixture = TestBed.createComponent(MvFeatureMovies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
