import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppHeaderComponent } from './app-header.component';

describe('AppHeaderComponent', () => {
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHeaderComponent);
    fixture.componentRef.setInput('title', 'Test Title');
    await fixture.whenStable();
  });

  it('should render the title', () => {
    expect(fixture.nativeElement.textContent).toContain('Test Title');
  });
});
