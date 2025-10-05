import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationComponent } from './education.component';
import { educationData } from '../../data/education.data';

/**
 * Unit tests for EducationComponent.
 */
describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  /**
   * Sets up the testing module and initializes the component.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationComponent);
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
   * Verifies that the education list data is initialized correctly.
   */
  it('should initialize educationList correctly', () => {
    expect(component.educationList).toEqual(educationData.en);
    expect(component.educationList.education.length).toBeGreaterThan(0);
  });

  /**
   * Verifies that resizeConditions returns the correct CSS class based on screen size.
   */
  it('should return correct CSS class from resizeConditions', () => {
    component.isLargeScreen = true;
    const cssClass = component.resizeConditions(2, false);
    expect(cssClass).toBe('full-height');

    component.isLargeScreen = false;
    component.is2kMoreScreen = false;
    const cssClassLast = component.resizeConditions(1, true);
    expect(cssClassLast).toBe('full-height');

    component.is2kMoreScreen = true;
    const cssClass2k = component.resizeConditions(0, false);
    expect(cssClass2k).toBe('full-height');
  });

  /**
   * Verifies that the template renders the education items correctly.
   */
  it('should render education items in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.education-item');

    expect(items.length).toBe(component.educationList.education.length);
  });
});
