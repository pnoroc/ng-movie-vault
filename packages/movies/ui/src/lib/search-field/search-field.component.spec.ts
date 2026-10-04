import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFieldComponent } from './search-field.component';

describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('query', 'matrix');
    await fixture.whenStable();
    input = fixture.nativeElement.querySelector('input');
  });

  it('should show the current query', () => {
    expect(input.value).toBe('matrix');
  });

  it('should emit submitted with the input value on button click', () => {
    const spy = vi.fn();
    component.submitted.subscribe(spy);

    input.value = 'alien';
    fixture.nativeElement.querySelector('button').click();

    expect(spy).toHaveBeenCalledWith('alien');
  });

  it('should emit cleared when the input becomes empty', () => {
    const spy = vi.fn();
    component.cleared.subscribe(spy);

    input.value = '  ';
    input.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalled();
  });

  it('should not emit cleared while the input has text', () => {
    const spy = vi.fn();
    component.cleared.subscribe(spy);

    input.value = 'ali';
    input.dispatchEvent(new Event('input'));

    expect(spy).not.toHaveBeenCalled();
  });
});
