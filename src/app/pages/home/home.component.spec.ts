import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';
import { APP_ENVIRONMENT } from '../../tokens/environment.token';
import { EnvironmentConfig } from '../../../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, NoopAnimationsModule],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: APP_ENVIRONMENT,
          useValue: {
            production: false,
            gaTrackingId: 'test',
            formspreeEndpoint: '',
            enableAnalytics: false,
            enableErrorTracking: false,
            sentryDsn: '',
            sentryTracesSampleRate: 0,
          } satisfies EnvironmentConfig,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render each main section', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    const sections = hostElement.querySelectorAll('.home-page__section');

    expect(sections.length).toBe(8);
    expect(hostElement.querySelector('app-hero')).toBeTruthy();
    expect(hostElement.querySelector('app-about')).toBeTruthy();
    expect(hostElement.querySelector('app-projects')).toBeTruthy();
    expect(hostElement.querySelector('app-skills')).toBeTruthy();
    expect(hostElement.querySelector('app-experiences')).toBeTruthy();
    expect(hostElement.querySelector('app-education')).toBeTruthy();
    expect(hostElement.querySelector('app-stats')).toBeTruthy();
    expect(hostElement.querySelector('app-contact-me')).toBeTruthy();
  });
});
