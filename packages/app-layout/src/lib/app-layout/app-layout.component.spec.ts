import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';

describe('AppLayoutComponent', () => {
  let fixture: ComponentFixture<AppLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppLayoutComponent);
    fixture.componentRef.setInput('headerTitle', 'Test Title');
    await fixture.whenStable();
  });

  it('should pass the title to the header', () => {
    expect(fixture.nativeElement.querySelector('mv-header').textContent).toContain('Test Title');
  });

  it('should render a router outlet', () => {
    expect(fixture.nativeElement.querySelector('router-outlet')).toBeTruthy();
  });
});
