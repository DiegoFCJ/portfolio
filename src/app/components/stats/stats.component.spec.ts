import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { StatsMetrics } from '../../dtos/StatsDTO';
import { experiencesData } from '../../data/experiences.data';
import { projects } from '../../data/projects.data';
import { statsData } from '../../data/stats.data';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';

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
      imports: [StatsComponent],
      providers: [{ provide: TranslationService, useClass: MockTranslationService }]
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
    fixture.detectChanges();
    expect(component.statistics.length).toBe(4);
    expect(component.statistics[0].label).toBe('Ore totali');
    expect(component.statistics[1].label).toBe('Mesi di esperienza');
    expect(component.statistics[2].label).toBe('Progetti consegnati');
    expect(component.statistics[3].label).toBe('Stack principale');
  });

  /**
   * Verifies that calculateStats computes correct statistics based on test data.
   */
  it('should calculate correct stats', () => {
    const stats: StatsMetrics = component.calculateStats(
      experiencesData.it.experiences,
      projects.it.projects,
      'it',
      statsData.it
    );

    expect(stats.hoursValue.endsWith('+')).toBeTrue();
    expect(stats.hoursSuffix).toBe('ore di sviluppo');
    expect(stats.monthsValue.endsWith('+')).toBeTrue();
    expect(stats.monthsSuffix).toBe('mesi su progetti reali');
    expect(stats.projectsValue).toBe('9');
    expect(stats.projectsSuffix).toBe('progetti seguiti end-to-end');
    expect(stats.mostUsedValue).toContain('·');
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
  it('should use computed statistics values in the rendered list', () => {
    fixture.detectChanges();
    const computedStats = component.calculateStats(
      experiencesData.it.experiences,
      projects.it.projects,
      'it',
      statsData.it
    );

    expect(component.statistics.length).toBe(4);
    expect(component.statistics[0].value).toBe(computedStats.hoursValue);
    expect(component.statistics[0].suffix).toBe(computedStats.hoursSuffix);
    expect(component.statistics[1].value).toBe(computedStats.monthsValue);
    expect(component.statistics[1].suffix).toBe(computedStats.monthsSuffix);
    expect(component.statistics[2].value).toBe(computedStats.projectsValue);
    expect(component.statistics[2].suffix).toBe(computedStats.projectsSuffix);
    expect(component.statistics[3].value).toBe(computedStats.mostUsedValue);
  });

  /**
   * Ensures that changing language keeps numeric values and icons untouched.
   */
  it('should keep numeric content stable when language changes', fakeAsync(() => {
    const translation = TestBed.inject(TranslationService);

    const initialIcons = component.statistics.map(stat => stat.icon);
    const initialValues = component.statistics.map(stat => stat.value);

    translation.setLanguage('en');
    fixture.detectChanges();
    tick();

    const updatedIcons = component.statistics.map(stat => stat.icon);
    const updatedValues = component.statistics.map(stat => stat.value);

    expect(updatedIcons).toEqual(initialIcons);
    expect(updatedValues).toEqual(initialValues);
  }));
});
