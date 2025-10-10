import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';
import { Project, ProjectStatusLegend } from '../../dtos/ProjectDTO';

/**
 * Unit tests for ProjectsComponent.
 */
describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

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

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  });

  it('should update project scroll boundary state when description is scrolled', () => {
    const project: Project = {
      title: 'Scrollable project',
      description: 'Details',
      technologies: ['Angular'],
      status: { level: 'active' },
      image: 'image.png',
      links: {
        preview: {
          url: 'https://example.com'
        }
      },
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
        scrollTop: 120,
        clientHeight: 100,
        scrollHeight: 200
      }
    } as unknown as Event);

    expect(project.isAtEnd).toBeTrue();
  });

  it('should update isMobile flag on window resize', () => {
    const innerWidthSpy = spyOnProperty(window, 'innerWidth', 'get');

    innerWidthSpy.and.returnValue(500);
    component.onResize();
    expect(component.isMobile).toBeTrue();

    innerWidthSpy.and.returnValue(1200);
    component.onResize();
    expect(component.isMobile).toBeFalse();
  });

  it('should clear peek timers and disable peek animation on user interaction', () => {
    component['peekStartTimeoutId'] = setTimeout(() => {
      throw new Error('peekStartTimeoutId should be cleared');
    }, 1000);
    component['peekStopTimeoutId'] = setTimeout(() => {
      throw new Error('peekStopTimeoutId should be cleared');
    }, 1000);
    component.shouldPeek = true;

    component.handleCarouselInteraction();

    expect(component['peekStartTimeoutId']).toBeNull();
    expect(component['peekStopTimeoutId']).toBeNull();
    expect(component.shouldPeek).toBeFalse();
  });

  it('should fall back to status keys when labels are missing', () => {
    const legend: ProjectStatusLegend = {
      prefix: 'Status',
      levels: {
        active: 'Active',
        publicBeta: 'Public beta',
        inDevelopment: 'In development'
      },
      tags: {
        openSource: 'Open source',
        release2024: '2024 launch'
      }
    };

    component.projects = {
      ...component.projects,
      statusLegend: legend
    };

    expect(component.getStatusLevelLabel('active')).toBe('Active');
    expect(component.getStatusTagLabel('openSource')).toBe('Open source');

    component.projects.statusLegend.levels.active = '';
    component.projects.statusLegend.tags.openSource = '';

    expect(component.getStatusLevelLabel('active')).toBe('active');
    expect(component.getStatusTagLabel('openSource')).toBe('openSource');
  });
});
