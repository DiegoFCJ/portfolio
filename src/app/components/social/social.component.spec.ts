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
      providers: [
        MockTranslationService,
        { provide: TranslationService, useExisting: MockTranslationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialComponent);
    component = fixture.componentInstance;
    translationService = TestBed.inject(MockTranslationService);
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

    const italianAnchors = fixture.debugElement.queryAll(By.css('a'));
    const italianImages = fixture.debugElement.queryAll(By.css('img'));

    expect(italianAnchors.length).toBe(4);
    expect(italianImages.length).toBe(4);

    const italianAnchor = italianAnchors[0];
    const italianImg = italianImages[0];

    expect(italianAnchor.attributes['aria-label']).toBe('Profilo LinkedIn');
    expect(italianAnchor.attributes['title']).toBe('Profilo LinkedIn');
    expect(italianImg.attributes['alt']).toBe('Profilo LinkedIn');

    const italianDiscordAnchor = italianAnchors[2];
    const italianDiscordImage = italianImages[2];

    expect(italianDiscordAnchor.attributes['aria-label']).toBe('Unisciti al server Discord');
    expect(italianDiscordAnchor.attributes['title']).toBe('Unisciti al server Discord');
    expect(italianDiscordImage.attributes['alt']).toBe('Unisciti al server Discord');

    translationService.setLanguage('en');
    fixture.detectChanges();

    const englishAnchors = fixture.debugElement.queryAll(By.css('a'));
    const englishImages = fixture.debugElement.queryAll(By.css('img'));

    expect(englishAnchors.length).toBe(4);
    expect(englishImages.length).toBe(4);

    const englishAnchor = englishAnchors[0];
    const englishImg = englishImages[0];

    expect(englishAnchor.attributes['aria-label']).toBe('LinkedIn Profile');
    expect(englishAnchor.attributes['title']).toBe('LinkedIn Profile');
    expect(englishImg.attributes['alt']).toBe('LinkedIn Profile');

    const englishDiscordAnchor = englishAnchors[2];
    const englishDiscordImage = englishImages[2];

    expect(englishDiscordAnchor.attributes['aria-label']).toBe('Join the Discord server');
    expect(englishDiscordAnchor.attributes['title']).toBe('Join the Discord server');
    expect(englishDiscordImage.attributes['alt']).toBe('Join the Discord server');
  });
});
