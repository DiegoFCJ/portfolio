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
   * Ensures translated project data is rendered and the toggle button updates expansion state.
   */
  it('should toggle project expansion via the template control', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const firstProject = component.projects.projects[0];
    const toggleButton: HTMLButtonElement | null = fixture.nativeElement.querySelector('.description-toggle');
    expect(toggleButton).withContext('toggle button should exist').not.toBeNull();

    expect(firstProject.expanded).toBeFalse();
    expect(toggleButton?.getAttribute('aria-expanded')).toBe('false');

    toggleButton?.click();
    fixture.detectChanges();

    expect(firstProject.expanded).toBeTrue();
    expect(toggleButton?.getAttribute('aria-expanded')).toBe('true');
  });

  /**
   * Verifies that toggleExpand correctly toggles the expanded state of a project instance.
   */
  it('should toggle expand state correctly', () => {
    const project: Project = {
      title: 'Sample project',
      description: 'Description',
      technologies: ['Angular'],
      status: { level: 'active' },
      image: 'image.png',
      link: 'https://example.com',
      expanded: false
    };

    component.toggleExpand(project);
    expect(project.expanded).toBeTrue();

    component.toggleExpand(project);
    expect(project.expanded).toBeFalse();
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
