import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialComponent } from './social.component';
import { firstValueFrom } from 'rxjs';

import { Social } from '../../dtos/SocialDTO';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';

/**
 * Unit tests for SocialComponent.
 */
describe('SocialComponent', () => {
  let component: SocialComponent;
  let fixture: ComponentFixture<SocialComponent>;

  /**
   * Sets up the testing module and initializes the component.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialComponent],
      providers: [{ provide: TranslationService, useClass: MockTranslationService }]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialComponent);
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
   * Verifies that the social media data is populated correctly.
   */
  it('should expose social media data as an array', async () => {
    const socials = await firstValueFrom(component.socials$);
    expect(Array.isArray(socials)).toBeTrue();
  });

  /**
   * Verifies the structure of a social media object.
   */
  it('should contain valid social media objects', async () => {
    const socials = await firstValueFrom(component.socials$);
    socials.forEach((social: Social) => {
      expect(social.link).toBeDefined();
      expect(social.icon).toBeDefined();
      expect(typeof social.link).toBe('string');
      expect(typeof social.icon).toBe('string');
    });
  });

  /**
   * Verifies that the social media data contains valid objects.
   */
  it('should contain valid social objects with link and icon properties', async () => {
    const socials = await firstValueFrom(component.socials$);
    socials.forEach((social: Social) => {
      expect(social).toEqual(jasmine.objectContaining({
        link: jasmine.any(String),
        icon: jasmine.any(String)
      }));
    });
  });
});