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
    const expectedEducation = educationData.en;

    expect(component.educationList).toEqual(expectedEducation);
    expect(component.educationList.education.length).toBe(educationData.en.education.length);
  });

  /**
   * Verifies that the template renders the education items correctly.
   */
  it('should render education items in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.timeline-item');

    expect(items.length).toBe(component.educationList.education.length);
  });

  /**
   * Verifies that timeline cards render their headings and badges correctly.
   */
  it('should render timeline headings and badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstCard = compiled.querySelector('.timeline-card');
    const firstEducation = component.educationList.education[0];

    expect(firstCard).toBeTruthy();
    expect(firstCard?.querySelector('.timeline-heading')?.textContent?.trim()).toBe(firstEducation.title);
    expect(firstCard?.querySelector('.timeline-badge')?.textContent?.trim()).toContain(firstEducation.startDate);
    expect(firstCard?.querySelector('.timeline-badge')?.textContent?.trim()).toContain(firstEducation.endDate);
  });
});
