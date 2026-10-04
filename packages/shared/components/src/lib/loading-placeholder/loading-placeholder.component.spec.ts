import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingPlaceholderComponent } from './loading-placeholder.component';

describe('LoadingPlaceholderComponent', () => {
  let fixture: ComponentFixture<LoadingPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingPlaceholderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingPlaceholderComponent);
  });

  it('should render the default text', async () => {
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Loading movies…');
  });

  it('should render a custom text', async () => {
    fixture.componentRef.setInput('text', 'Please wait');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Please wait');
  });
});
