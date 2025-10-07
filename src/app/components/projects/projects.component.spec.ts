import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';
import { Project } from '../../dtos/ProjectDTO';

/**
 * Unit tests for ProjectsComponent.
 */
describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  /**
   * Sets up the testing module and initializes the component.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifies that the component is created successfully.
   */
  it('should create', async () => {
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });

  /**
   * Ensures the project description is rendered without the legacy toggle button.
   */
  it('should render the project description without a toggle button', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const toggleButton: HTMLButtonElement | null = fixture.nativeElement.querySelector('.description-toggle');
    const descriptionRegion: HTMLElement | null = fixture.nativeElement.querySelector('.description-content');

    expect(toggleButton).withContext('toggle button should not be present').toBeNull();
    expect(descriptionRegion).withContext('description content should be rendered').not.toBeNull();
    expect(descriptionRegion?.getAttribute('tabindex')).toBe('0');
  });

  /**
   * Verifies that the scroll handler updates the scroll boundary state.
   */
  it('should update scroll state when the description is scrolled', () => {
    const project: Project = {
      title: 'Sample project',
      description: 'Description',
      technologies: ['Angular'],
      status: { level: 'active' },
      image: 'image.png',
      link: 'https://example.com',
      isScrollable: true,
      isAtEnd: false
    };

    component.onDescriptionScroll(project, {
      target: {
        scrollTop: 0,
        clientHeight: 100,
        scrollHeight: 200
      }
    } as unknown as Event);

    expect(project.isAtEnd).toBeFalse();

    component.onDescriptionScroll(project, {
      target: {
        scrollTop: 110,
        clientHeight: 100,
        scrollHeight: 200
      }
    } as unknown as Event);

    expect(project.isAtEnd).toBeTrue();
  });

  /**
   * Verifies that the onResize method correctly updates the mobile view state.
   */
  it('should update isMobile flag on window resize', () => {
    globalThis.innerWidth = 500;
    component.onResize();
    expect(component.isMobile).toBeTrue();

    globalThis.innerWidth = 1000;
    component.onResize();
    expect(component.isMobile).toBeFalse();
  });

  /**
   * Ensures user interactions stop the automatic peek animation.
   */
  it('should stop peek animation on interaction', () => {
    // Arrange timers so that the component has pending animation steps.
    component['peekStartTimeoutId'] = setTimeout(() => fail('start timeout should be cleared'), 1000);
    component['peekStopTimeoutId'] = setTimeout(() => fail('stop timeout should be cleared'), 1000);
    component.shouldPeek = true;

    // Act - simulate user interaction with the carousel viewport.
    component.handleCarouselInteraction();

    // Assert - timers are cleared and peek animation is disabled.
    expect(component['peekStartTimeoutId']).toBeNull();
    expect(component['peekStopTimeoutId']).toBeNull();
    expect(component.shouldPeek).toBeFalse();
  });
});
