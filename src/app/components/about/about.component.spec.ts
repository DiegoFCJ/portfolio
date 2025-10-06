import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { AboutMe } from '../../dtos/AboutMeDTO';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';

/**
 * Unit tests for AboutComponent.
 */
describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  /**
   * Sets up the testing module and initializes the component.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
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
   * Verifies that the aboutMe property is initialized correctly.
   */
  it('should initialize aboutMe correctly', () => {
    expect(component.aboutMe).toBeDefined();
    expect(component.aboutMe.title).toBeTruthy();
    expect(component.aboutMe.description).toBeTruthy();
  });

  /**
   * Verifies that the template renders title and description correctly.
   */
  it('should render title and description in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const titleElement = compiled.querySelector('.about-title') as HTMLElement;
    const descriptionElement = compiled.querySelector('.about-description') as HTMLElement;

    expect(titleElement.textContent).toBe(component.aboutMe.title);
    expect(descriptionElement.textContent).toBe(component.aboutMe.description);
  });

  /**
   * Verifies that the template is updated when aboutMe data changes.
   */
  it('should update the template when aboutMe data changes', () => {
    const newAboutMe: AboutMe = {
      title: 'New Title',
      description: 'Updated description for testing.'
    };

    component.aboutMe = newAboutMe;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.about-title') as HTMLElement;
    const descriptionElement = compiled.querySelector('.about-description') as HTMLElement;

    expect(titleElement.textContent).toBe(newAboutMe.title);
    expect(descriptionElement.textContent).toBe(newAboutMe.description);
  });
});
