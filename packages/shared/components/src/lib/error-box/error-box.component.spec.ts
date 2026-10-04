import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorBoxComponent } from './error-box.component';

describe('ErrorBoxComponent', () => {
  let component: ErrorBoxComponent;
  let fixture: ComponentFixture<ErrorBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorBoxComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('error', 'Something went wrong');
    await fixture.whenStable();
  });

  it('should render the error message', () => {
    expect(fixture.nativeElement.textContent).toContain('Something went wrong');
  });

  it('should emit retryCLick when the button is clicked', () => {
    const spy = vi.fn();
    component.retryCLick.subscribe(spy);

    fixture.nativeElement.querySelector('button').click();

    expect(spy).toHaveBeenCalled();
  });
});
