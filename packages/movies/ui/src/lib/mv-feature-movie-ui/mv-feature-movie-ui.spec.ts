import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MvFeatureMovieUi } from './mv-feature-movie-ui';

describe('MvFeatureMovieUi', () => {
  let component: MvFeatureMovieUi;
  let fixture: ComponentFixture<MvFeatureMovieUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MvFeatureMovieUi],
    }).compileComponents();

    fixture = TestBed.createComponent(MvFeatureMovieUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
