import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MvFeatureMovieDetails } from './mv-feature-movie-details';

describe('MvFeatureMovieDetails', () => {
  let component: MvFeatureMovieDetails;
  let fixture: ComponentFixture<MvFeatureMovieDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MvFeatureMovieDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(MvFeatureMovieDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
