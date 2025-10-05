import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperiencesComponent } from './experiences.component';
import { of } from 'rxjs';
import { experiencesData } from '../../data/experiences.data';
import { TranslationService } from '../../services/translation.service';
import { LanguageMap } from '../../models/language.types';

/**
 * Unit tests for ExperiencesComponent.
 */
class MockTranslationService {
  currentLanguage$ = of<'en'>('en');

  getTranslatedData<T>(data: LanguageMap<T>) {
    return of(data.en);
  }
}

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
    await fixture.whenStable();
    fixture.detectChanges();
  });

  // Verify component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verify the data is correctly initialized
  it('should initialize experiences data correctly', () => {
    const expectedExperiences = experiencesData.en;
    expect(component.experiences).toEqual(expectedExperiences);
    expect(component.isLoading).toBeFalse();
    expect(component.experiences.experiences.length).toBe(expectedExperiences.experiences.length);
    expect(component.experiences.title).toBe(expectedExperiences.title);
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
