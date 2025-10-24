import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ContactMeComponent } from './contact-me.component';
import { SocialComponent } from '../social/social.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';
import { APP_ENVIRONMENT } from '../../tokens/environment.token';
import { EnvironmentConfig } from '../../../environments/environment';

/**
 * Unit tests for ContactMeComponent.
 */
describe('ContactMeComponent', () => {
  let component: ContactMeComponent;
  let fixture: ComponentFixture<ContactMeComponent>;

  const environmentStub: EnvironmentConfig = {
    production: false,
    gaTrackingId: '',
    formspreeEndpoint: '',
    enableAnalytics: false,
  };

  /**
   * Sets up the testing module and initializes the component.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMeComponent, SocialComponent, NoopAnimationsModule],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: APP_ENVIRONMENT, useValue: environmentStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactMeComponent);
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
   * Verifies that the contactMe data is initialized correctly.
   */
  it('should initialize contactMe correctly', () => {
    expect(component.contactMe).toBeDefined();
    expect(component.contactMe.title).toBeTruthy();
  });

  /**
   * Verifies that the template renders the title correctly.
   */
  it('should render the title in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.contact-me-title') as HTMLElement;

    expect(titleElement.textContent).toBe(component.contactMe.title);
  });
});
