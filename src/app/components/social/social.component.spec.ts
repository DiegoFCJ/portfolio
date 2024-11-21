import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialComponent } from './social.component';
import { Social } from '../../dtos/SocialDTO';

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
      imports: [SocialComponent]
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
  it('should have social media data', () => {
    expect(component.socialsData.length).toBeGreaterThan(0);
    expect(component.socialsData[0].link).toBeDefined();
    expect(component.socialsData[0].icon).toBeDefined();
  });

  /**
   * Verifies the structure of a social media object.
   */
  it('should contain valid social media objects', () => {
    const social: Social = component.socialsData[0];
    expect(social.link).toBeDefined();
    expect(social.icon).toBeDefined();
    expect(typeof social.link).toBe('string');
    expect(typeof social.icon).toBe('string');
  });

  /**
   * Verifies that the social media data contains valid objects.
   */
  it('should contain valid social objects with link and icon properties', () => {
    const social: Social = component.socialsData[0];
    expect(social).toEqual(jasmine.objectContaining({
      link: jasmine.any(String),
      icon: jasmine.any(String)
    }));
  });
});