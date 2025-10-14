import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialComponent } from './social.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';
import { By } from '@angular/platform-browser';

/**
 * Unit tests for SocialComponent.
 */
describe('SocialComponent', () => {
  let component: SocialComponent;
  let fixture: ComponentFixture<SocialComponent>;

  /**
   * Sets up the testing module and initializes the component.
   */
  let translationService: MockTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialComponent],
      providers: [{ provide: TranslationService, useClass: MockTranslationService }]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialComponent);
    component = fixture.componentInstance;
    translationService = TestBed.inject(TranslationService) as MockTranslationService;
    fixture.detectChanges();
  });

  /**
   * Verifies that the component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifies that the social media data is populated correctly.
   */
  it('should render localized labels based on the current language', () => {
    fixture.detectChanges();

    const italianAnchor = fixture.debugElement.queryAll(By.css('a'))[0];
    const italianImg = fixture.debugElement.queryAll(By.css('img'))[0];

    expect(italianAnchor.attributes['aria-label']).toBe('Profilo LinkedIn');
    expect(italianAnchor.attributes['title']).toBe('Profilo LinkedIn');
    expect(italianImg.attributes['alt']).toBe('Profilo LinkedIn');

    translationService.setLanguage('en');
    fixture.detectChanges();

    const englishAnchor = fixture.debugElement.queryAll(By.css('a'))[0];
    const englishImg = fixture.debugElement.queryAll(By.css('img'))[0];

    expect(englishAnchor.attributes['aria-label']).toBe('LinkedIn Profile');
    expect(englishAnchor.attributes['title']).toBe('LinkedIn Profile');
    expect(englishImg.attributes['alt']).toBe('LinkedIn Profile');
  });
});
