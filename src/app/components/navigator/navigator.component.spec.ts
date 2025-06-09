import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigatorComponent } from './navigator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeswitchComponent } from './themeswitch/themeswitch.component';

/**
 * Unit tests for NavigatorComponent to ensure correct functionality.
 */
describe('NavigatorComponent', () => {
  let component: NavigatorComponent;
  let fixture: ComponentFixture<NavigatorComponent>;

  /**
   * Sets up the testing environment for NavigatorComponent.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigatorComponent, MatIconModule, MatTooltipModule, ThemeswitchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifies that the component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifies that the next navigation event is emitted when onNext is called.
   */
  it('should emit navigateNext event when onNext is called', () => {
    spyOn(component.navigateNext, 'emit');
    component.onNext();
    expect(component.navigateNext.emit).toHaveBeenCalled();
  });

  /**
   * Verifies that the previous navigation event is emitted when onPrevious is called.
   */
  it('should emit navigatePrevious event when onPrevious is called', () => {
    spyOn(component.navigatePrevious, 'emit');
    component.currentSectionIndex = 1;
    component.onPrevious();
    expect(component.navigatePrevious.emit).toHaveBeenCalled();
  });

  /**
   * Verifies that the navigation buttons are displayed conditionally.
   */
  it('should display navigation buttons based on current section index', () => {
    component.currentSectionIndex = 0;
    fixture.detectChanges();
    let prevButton = fixture.nativeElement.querySelector('button[aria-label="Previous section"]');
    expect(prevButton).toBeNull();  // Previous button should be hidden

    component.currentSectionIndex = 7;
    fixture.detectChanges();
    let nextButton = fixture.nativeElement.querySelector('button[aria-label="Next section"]');
    expect(nextButton).toBeNull();  // Next button should be hidden

    component.currentSectionIndex = 4;
    fixture.detectChanges();
    prevButton = fixture.nativeElement.querySelector('button[aria-label="Previous section"]');
    nextButton = fixture.nativeElement.querySelector('button[aria-label="Next section"]');
    expect(prevButton).toBeTruthy();  // Previous button should be visible
    expect(nextButton).toBeTruthy();  // Next button should be visible
  });
});
