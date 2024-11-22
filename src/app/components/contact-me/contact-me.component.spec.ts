import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactMeComponent } from './contact-me.component';
import { SocialComponent } from '../social/social.component';

/**
 * Unit tests for ContactMeComponent.
 */
describe('ContactMeComponent', () => {
  let component: ContactMeComponent;
  let fixture: ComponentFixture<ContactMeComponent>;

  /**
   * Sets up the testing module and initializes the component.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMeComponent, SocialComponent]
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