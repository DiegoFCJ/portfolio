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
    component.onResize(new Event('resize'));
    expect(component.isMobile).toBeTrue();

    globalThis.innerWidth = 1000;
    component.onResize(new Event('resize'));
    expect(component.isMobile).toBeFalse();
  });

  /**
   * Verifies that moveToNext correctly navigates to the next project.
   */
  it('should move to next project', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    component.currentIndex = 0;
    component.moveToNext();
    expect(component.currentIndex).toBe(1);

    component.currentIndex = component.projects.projects.length - 1;
    component.moveToNext();
    expect(component.currentIndex).toBe(0);
  });

  /**
   * Verifies that moveToPrevious correctly navigates to the previous project.
   */
  it('should move to previous project', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    component.currentIndex = 1;
    component.moveToPrevious();
    expect(component.currentIndex).toBe(0);

    component.currentIndex = 0;
    component.moveToPrevious();
    expect(component.currentIndex).toBe(component.projects.projects.length - 1);
  });
});
