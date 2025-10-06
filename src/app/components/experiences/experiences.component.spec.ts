import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperiencesComponent } from './experiences.component';
import { experiencesData } from '../../data/experiences.data';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';
import { Experience, ExperienceFull } from '../../dtos/ExperienceDTO';

/**
 * Unit tests for ExperiencesComponent.
 */
describe('ExperiencesComponent', () => {
  let component: ExperiencesComponent;
  let fixture: ComponentFixture<ExperiencesComponent>;

  // Initialize the test environment and component
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencesComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verify component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const buildExpectedTimeline = (data: ExperienceFull) => ({
    title: data.title,
    experiences: data.experiences.map((experience: Experience) => ({
      ...experience,
      formattedPeriod: formatPeriod(experience.startDate, experience.endDate),
      responsibilityItems: prepareResponsibilities(experience.responsibilityList)
    }))
  });

  const EN_DASH = ' – ';

  const formatPeriod = (startDate?: string, endDate?: string): string => {
    const start = (startDate ?? '').trim();
    const end = (endDate ?? '').trim();

    if (!start && !end) {
      return '';
    }

    if (!end) {
      return start;
    }

    const isCurrent = /present|presente|current|attuale/i.test(end);
    const formattedEnd = isCurrent ? end.charAt(0).toUpperCase() + end.slice(1) : end;

    if (!start) {
      return formattedEnd;
    }

    return `${start}${EN_DASH}${formattedEnd}`;
  };

  const prepareResponsibilities = (responsibilityList?: string[]): string[] =>
    (responsibilityList ?? [])
      .map(item => item.trim())
      .filter(Boolean);

  // Verify the data is correctly initialized
  it('should initialize experiences data correctly', () => {
    const expectedTimeline = buildExpectedTimeline(experiencesData.it);

    expect(component.experiences.title).toBe(expectedTimeline.title);
    expect(component.experiences.experiences.length)
      .toBe(expectedTimeline.experiences.length);
    expect(component.experiences.experiences)
      .toEqual(expectedTimeline.experiences);
  });

  // Verify the template renders the experiences correctly
  it('should render the correct number of experiences', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const experienceElements = compiled.querySelectorAll('.timeline-item');
    expect(experienceElements.length).toBe(component.experiences.experiences.length);
  });

  // Verify the rendering of a specific experience field
  it('should display the start and end dates for each experience', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const experienceElements = compiled.querySelectorAll('.timeline-item');
    experienceElements.forEach((element, index) => {
      const experience = component.experiences.experiences[index];
      const badge = element.querySelector('.timeline-badge');
      expect(badge?.textContent?.trim()).toBe(experience.formattedPeriod);
    });
  });
});
