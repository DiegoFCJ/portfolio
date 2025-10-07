import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';

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
   * Verifies that toggleExpand correctly toggles the expanded state of a project.
   */
  it('should toggle expand state correctly', () => {
    const project = { expanded: false } as { expanded: boolean };

    component.toggleExpand(project);
    expect(project.expanded).toBe(true);

    component.toggleExpand(project);
    expect(project.expanded).toBe(false);
  });

  /**
   * Verifies that clicking the toggle button updates the DOM state.
   */
  it('should update description state in the template when toggled', () => {
    // Force desktop layout so the grid is rendered for inspection
    component.isMobile = false;
    fixture.detectChanges();

    const firstProject = component.projects.projects[0];
    const card: HTMLElement | null = fixture.nativeElement.querySelector('.project-card');
    expect(card).withContext('project card should render').not.toBeNull();
    if (!card) {
      return;
    }

    const description = card.querySelector('.project-description');
    const toggleButton = card.querySelector('.toggle-description') as HTMLButtonElement | null;

    expect(description).withContext('description container should exist').not.toBeNull();
    expect(toggleButton).withContext('toggle button should exist').not.toBeNull();

    if (!description || !toggleButton) {
      return;
    }

    expect(description.classList.contains('expanded')).toBeFalse();
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
    expect(toggleButton.textContent?.trim()).toBe(component.projects.moreDesc);
    expect(toggleButton.getAttribute('aria-controls')).toBe(description.getAttribute('id'));

    toggleButton.click();
    fixture.detectChanges();

    expect(firstProject.expanded).toBeTrue();
    expect(description.classList.contains('expanded')).toBeTrue();
    expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
    expect(toggleButton.textContent?.trim()).toBe(component.projects.lessDesc);
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
