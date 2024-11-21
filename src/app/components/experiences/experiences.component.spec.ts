import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperiencesComponent } from './experiences.component';
import { experiencesData } from '../../data/experiences.data';

/**
 * Unit tests for ExperiencesComponent.
 */
describe('ExperiencesComponent', () => {
  let component: ExperiencesComponent;
  let fixture: ComponentFixture<ExperiencesComponent>;

  // Initialize the test environment and component
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verify component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verify the data is correctly initialized
  it('should initialize experiences data correctly', () => {
    expect(component.experiences).toEqual(experiencesData);
    expect(component.experiences.experiences.length).toBeGreaterThan(0);
  });

  // Verify the template renders the experiences correctly
  it('should render the correct number of experiences', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const experienceElements = compiled.querySelectorAll('.experience');
    expect(experienceElements.length).toBe(component.experiences.experiences.length);
  });

  // Verify the rendering of a specific experience field
  it('should display the start and end dates for each experience', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const experienceElements = compiled.querySelectorAll('.experience');
    experienceElements.forEach((element, index) => {
      const experience = component.experiences.experiences[index];
      expect(element.textContent).toContain(`${experience.startDate} - ${experience.endDate}`);
    });
  });
});
