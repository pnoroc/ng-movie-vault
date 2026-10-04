import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingBadgeComponent } from './rating-badge.component';

describe('RatingBadgeComponent', () => {
  let fixture: ComponentFixture<RatingBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingBadgeComponent);
  });

  it('should render the rating with one decimal', async () => {
    fixture.componentRef.setInput('rating', 7.46);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('7.5');
  });
});
