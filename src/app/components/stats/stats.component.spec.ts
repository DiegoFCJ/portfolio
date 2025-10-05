import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { StatsItem } from '../../dtos/StatsDTO';
import { experiencesData } from '../../data/experiences.data';
import { projects } from '../../data/projects.data';

/**
 * Unit tests for StatsComponent.
 */
describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  /**
   * Sets up the testing module and initializes the component.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsComponent);
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
   * Verifies that statistics are correctly prepared after initialization.
   */
  it('should prepare statistics correctly', () => {
    component.ngOnInit();
    expect(component.statistics.length).toBe(4);
    expect(component.statistics[0].label).toBe('Total Hours');
    expect(component.statistics[1].label).toBe('Total Months');
    expect(component.statistics[2].label).toBe('Projects');
    expect(component.statistics[3].label).toBe('Most Used');
  });

  /**
   * Verifies that calculateStats computes correct statistics based on test data.
   */
  it('should calculate correct stats', () => {
    const stats: StatsItem = component.calculateStats(experiencesData.en.experiences, projects.en.projects);

    expect(stats.hours).toContain('hours');
    expect(stats.months).toContain('months');
    expect(stats.projects).toContain('projects');
    expect(stats.mostUsed).toBeTruthy();
  });

  /**
   * Tests normalizeTechnology to ensure proper normalization of technology names.
   */
  it('should normalize technology names correctly', () => {
    const normalized = component.normalizeTechnology('Java 8 (LTS)');
    expect(normalized).toBe('java');
  });

  /**
   * Tests formatTechnology to ensure proper formatting of technology names.
   */
  it('should format technology names correctly', () => {
    const formatted = component.formatTechnology('java');
    expect(formatted).toBe('Java');

    const formattedSQL = component.formatTechnology('sql server');
    expect(formattedSQL).toBe('SQL Server');
  });

  /**
   * Verifies the calculation of months between two dates.
   */
  it('should calculate months correctly', () => {
    const months = component.calculateMonths('2020-01-01', '2020-12-31');
    expect(months).toBe(12);

    const singleMonth = component.calculateMonths('2020-01-01', '2020-01-31');
    expect(singleMonth).toBe(1);
  });

  /**
   * Ensures that prepareStatistics populates the statistics array correctly.
   */
  it('should populate statistics array', () => {
    component.stats = {
      hours: '4000 hours',
      months: '24 months',
      projects: '12 projects',
      mostUsed: 'Java, Angular, SQL, Node.js'
    };

    component.prepareStatistics('en');

    expect(component.statistics.length).toBe(4);
    expect(component.statistics[0].value).toBe('4000 hours');
    expect(component.statistics[1].value).toBe('24 months');
    expect(component.statistics[2].value).toBe('12 projects');
    expect(component.statistics[3].value).toBe('Java, Angular, SQL, Node.js');
  });
});