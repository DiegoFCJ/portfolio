import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { projects } from '../../data/projects.data';

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
      imports: [ProjectsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
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
   * Verifies that the description is truncated when it exceeds maxChars.
   */
  it('should truncate project description correctly', () => {
    const longDescription = 'This is a long description '.repeat(10); // A long string
    const project = { description: longDescription, expanded: false };

    expect(component.getTruncatedDescription(project)).toBe(longDescription.substring(0, component.maxChars) + '...');
  });

  /**
   * Verifies that the description is not truncated when it is expanded.
   */
  it('should return full description when expanded', () => {
    const fullDescription = 'This is a full description';
    const project = { description: fullDescription, expanded: true };

    expect(component.getTruncatedDescription(project)).toBe(fullDescription);
  });

  /**
   * Verifies that toggleExpand correctly toggles the expanded state of a project.
   */
  it('should toggle expand state correctly', () => {
    const project = { expanded: false };

    component.toggleExpand(project);
    expect(project.expanded).toBe(true);

    component.toggleExpand(project);
    expect(project.expanded).toBe(false);
  });

  /**
   * Verifies that the onResize method correctly updates the mobile view state.
   */
  it('should update isMobile flag on window resize', () => {
    // Simulate a small screen size
    globalThis.innerWidth = 500;
    component.onResize(new Event('resize'));
    expect(component.isMobile).toBeTrue();

    // Simulate a larger screen size
    globalThis.innerWidth = 1000;
    component.onResize(new Event('resize'));
    expect(component.isMobile).toBeFalse();
  });

  /**
   * Verifies that moveToNext correctly navigates to the next project.
   */
  it('should move to next project', () => {
    component.currentIndex = 0;
    component.moveToNext();
    expect(component.currentIndex).toBe(1);

    // Cycle back to the first project
    component.currentIndex = component.projects.projects.length - 1;
    component.moveToNext();
    expect(component.currentIndex).toBe(0);
  });

  /**
   * Verifies that moveToPrevious correctly navigates to the previous project.
   */
  it('should move to previous project', () => {
    component.currentIndex = 1;
    component.moveToPrevious();
    expect(component.currentIndex).toBe(0);

    // Cycle back to the last project
    component.currentIndex = 0;
    component.moveToPrevious();
    expect(component.currentIndex).toBe(component.projects.projects.length - 1);
  });
});