import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { StatsMetrics } from '../../dtos/StatsDTO';
import { experiencesData } from '../../data/experiences.data';
import { projects } from '../../data/projects.data';
import { statsData } from '../../data/stats.data';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';

const getExperiencesIt = () => {
  const experiencesIt = experiencesData.it;
  if (!experiencesIt) {
    fail('experiencesData.it is not defined');
    throw new Error('experiencesData.it is not defined');
  }
  return experiencesIt;
};

const getProjectsIt = () => {
  const projectsIt = projects.it;
  if (!projectsIt) {
    fail('projects.it is not defined');
    throw new Error('projects.it is not defined');
  }
  return projectsIt;
};

const getStatsIt = () => {
  const statsIt = statsData.it;
  if (!statsIt) {
    fail('statsData.it is not defined');
    throw new Error('statsData.it is not defined');
  }
  return statsIt;
};

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
    const statsIt = getStatsIt();
    fixture.detectChanges();
    expect(component.statistics.length).toBe(4);
    expect(component.statistics[0].label).toBe(statsIt.stats[0].label);
    expect(component.statistics[1].label).toBe(statsIt.stats[1].label);
    expect(component.statistics[2].label).toBe(statsIt.stats[2].label);
    expect(component.statistics[3].label).toBe(statsIt.stats[3].label);
  });

  /**
   * Verifies that calculateStats computes correct statistics based on test data.
   */
  it('should calculate correct stats', () => {
    const experiencesIt = getExperiencesIt();
    const projectsIt = getProjectsIt();
    const statsIt = getStatsIt();
    const stats: StatsMetrics = component.calculateStats(
      experiencesIt.experiences,
      projectsIt.projects,
      'it',
      statsIt
    );

    expect(stats.hoursValue.endsWith('+')).toBeTrue();
    expect(stats.hoursSuffix).toBe('ore di sviluppo');
    expect(stats.monthsValue.endsWith('+')).toBeTrue();
    expect(stats.monthsSuffix).toBe('mesi su progetti reali');
    const expectedProjectTotal = (
      projectsIt.projects.length +
      experiencesIt.experiences.filter(exp => {
        const hasTechnologies = Boolean(exp.technologies?.trim().length);
        const role = (exp.position ?? '').toLowerCase();
        const isTechRole = /(sviluppatore|developer)/.test(role);
        return hasTechnologies && isTechRole;
      }).length
    ).toString();

    expect(stats.projectsValue).toBe(expectedProjectTotal);
    const expectedProjectsSuffix = statsIt.stats[2].valueSuffix ?? 'iniziative con contributo diretto';
    expect(stats.projectsSuffix).toBe(expectedProjectsSuffix);
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
    const experiencesIt = getExperiencesIt();
    const projectsIt = getProjectsIt();
    const statsIt = getStatsIt();
    fixture.detectChanges();
    const computedStats = component.calculateStats(
      experiencesIt.experiences,
      projectsIt.projects,
      'it',
      statsIt
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

  it('should expose detail text for each statistic', () => {
    fixture.detectChanges();
    const statsIt = getStatsIt();

    expect(component.statistics.length).toBeGreaterThan(0);
    component.statistics.forEach((stat, index) => {
      expect(stat.detail.length).toBeGreaterThan(0);
      expect(stat.detail).toBe(statsIt.stats[index].detail);
    });
  });

  it('should open and close detail popup while restoring focus', () => {
    fixture.detectChanges();
    const trigger = document.createElement('button');
    spyOn(trigger, 'focus');

    const stat = component.statistics[0];
    component.openStatDetail(stat, trigger);

    expect(component.selectedStat).toBe(stat);

    component.closeStatDetail();

    expect(component.selectedStat).toBeNull();
    expect(trigger.focus).toHaveBeenCalled();
  });

  it('should close popup on escape key press', () => {
    fixture.detectChanges();

    const stat = component.statistics[0];
    component.openStatDetail(stat);
    expect(component.selectedStat).toBe(stat);

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    component.handleEscape(escapeEvent);

    expect(component.selectedStat).toBeNull();
  });

  it('should update close button label when language changes', fakeAsync(() => {
    fixture.detectChanges();
    const translation = TestBed.inject(TranslationService);

    translation.setLanguage('en');
    fixture.detectChanges();
    tick();

    expect(component.closeButtonLabel).toBe('Close detail');
  }));
});
