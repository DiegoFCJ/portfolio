import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { AboutMe } from '../../dtos/AboutMeDTO';
import { aboutMeData } from '../../data/about-me.data';
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
  it('should initialize aboutMe correctly', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.aboutMe).toBeDefined();
    expect(component.aboutMe.title).toBeTruthy();
    expect(component.aboutMe.paragraphs.length).toBeGreaterThan(0);
    expect(component.aboutMe.highlightsTitle).toBeTruthy();
    expect(component.aboutMe.highlights.length).toBeGreaterThan(0);
  });

  /**
   * Verifies that the template renders title, paragraphs and highlights correctly.
   */
  it('should render title and structured content in the template', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const expectedAboutMe = aboutMeData.it;

    const titleElement = compiled.querySelector('.about-title') as HTMLElement;
    const paragraphElements = Array.from(
      compiled.querySelectorAll<HTMLParagraphElement>('.about-paragraph')
    );
    const highlightHeading = compiled.querySelector(
      '.about-subtitle'
    ) as HTMLElement;
    const highlightItems = Array.from(
      compiled.querySelectorAll<HTMLLIElement>('.about-list-item')
    );

    expect(titleElement.textContent?.trim()).toBe(expectedAboutMe.title);
    expect(paragraphElements.length).toBe(expectedAboutMe.paragraphs.length);
    paragraphElements.forEach((paragraph, index) => {
      expect(paragraph.textContent?.trim()).toBe(
        expectedAboutMe.paragraphs[index]
      );
    });

    expect(highlightHeading.textContent?.trim()).toBe(
      expectedAboutMe.highlightsTitle
    );
    expect(highlightItems.length).toBe(expectedAboutMe.highlights.length);
    highlightItems.forEach((item, index) => {
      expect(item.textContent?.trim()).toBe(expectedAboutMe.highlights[index]);
    });
  });

  /**
   * Verifies that the template is updated when aboutMe data changes.
   */
  it('should update the template when aboutMe data changes', () => {
    const newAboutMe: AboutMe = {
      title: 'New Title',
      paragraphs: ['Paragraph one.', 'Paragraph two.'],
      highlightsTitle: 'Highlights',
      highlights: ['Highlight A', 'Highlight B']
    };

    component.aboutMe = newAboutMe;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.about-title') as HTMLElement;
    const paragraphElements = compiled.querySelectorAll('.about-paragraph');
    const highlightHeading = compiled.querySelector(
      '.about-subtitle'
    ) as HTMLElement;
    const highlightItems = compiled.querySelectorAll('.about-list-item');

    expect(titleElement.textContent?.trim()).toBe(newAboutMe.title);
    expect(paragraphElements.length).toBe(newAboutMe.paragraphs.length);
    expect(highlightHeading.textContent?.trim()).toBe(
      newAboutMe.highlightsTitle
    );
    expect(highlightItems.length).toBe(newAboutMe.highlights.length);
  });
});
