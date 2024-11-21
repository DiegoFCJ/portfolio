import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingMaskComponent } from './landing-mask.component';
import { By } from '@angular/platform-browser';

/**
 * Unit tests for LandingMaskComponent.
 * These tests validate circle generation and animation logic.
 */
describe('LandingMaskComponent', () => {
  let component: LandingMaskComponent;
  let fixture: ComponentFixture<LandingMaskComponent>;

  /**
   * Sets up the testing module and initializes the component.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingMaskComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingMaskComponent);
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
   * Verifies that a random number of circles (between 3 and 9) are generated.
   */
  it('should generate a random number of circles between 3 and 9', () => {
    const initialCircleCount = component.circles.length;
    expect(initialCircleCount).toBeGreaterThanOrEqual(3);
    expect(initialCircleCount).toBeLessThanOrEqual(9);
  });

  /**
   * Verifies that circles are properly animated by checking the DOM styles.
   * The keyframes animation should be applied to each circle.
   */
  it('should apply animation to circles', () => {
    component.ngAfterViewInit();

    // Check that the circles have an animation style applied
    const circles = fixture.debugElement.queryAll(By.css('.circle')); // Assuming circles have a class 'circle'
    circles.forEach(circle => {
      const style = circle.nativeElement.style.animation;
      expect(style).toContain('ease-in-out');
    });
  });

  /**
   * Verifies that circles are re-generated when the window is resized.
   */
  it('should regenerate circles on window resize', () => {
    const initialCircleCount = component.circles.length;

    // Simulate window resize
    component.onResize();
    fixture.detectChanges();

    expect(component.circles.length).not.toBe(initialCircleCount);  // Expect a new set of circles to be generated
  });
});