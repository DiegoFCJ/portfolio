import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';
import { APP_ENVIRONMENT } from '../../tokens/environment.token';
import { EnvironmentConfig } from '../../../environments/environment';
import { ViewportService } from '../../services/viewport.service';
import { MockViewportService } from '../../testing/mock-viewport.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, NoopAnimationsModule],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: ViewportService, useClass: MockViewportService },
        {
          provide: APP_ENVIRONMENT,
          useValue: {
            production: false,
            gaTrackingId: 'test-tracking-id',
            formspreeEndpoint: '',
            enableAnalytics: false,
            enableErrorTracking: false,
            sentryDsn: '',
            sentryTracesSampleRate: 0,
          } satisfies EnvironmentConfig,
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero component', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.querySelector('app-hero')).not.toBeNull();
  });

  it('should render key content sections', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.querySelector('app-projects')).not.toBeNull();
    expect(host.querySelector('app-skills')).not.toBeNull();
    expect(host.querySelector('app-contact-me')).not.toBeNull();
  });
});
