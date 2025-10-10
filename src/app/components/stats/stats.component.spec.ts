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
    expect(component.statistics[2].label).toBe('Progetti a cui ho contribuito');
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

    const formatter = new Intl.NumberFormat('it-IT');
    const professionalExperiences = experiencesData.it.experiences.filter(exp => {
      const hasTechnologies = Boolean(exp.technologies?.trim().length);
      const role = (exp.position ?? '').toLowerCase();
      const isTechRole = /(sviluppatore|developer)/.test(role);
      return hasTechnologies && isTechRole;
    });

    const activeMonths = new Set<string>();
    const monthMap: Record<string, number> = {
      gen: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      mag: 4,
      giu: 5,
      lug: 6,
      ago: 7,
      set: 8,
      ott: 9,
      nov: 10,
      dic: 11,
      jan: 0,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      dec: 11
    };

    const parseDate = (value: string): Date => {
      const trimmed = value.trim();
      const monthYearMatch = trimmed.match(/^([A-Za-zÀ-ÿ]+)\s+(\d{4})$/);
      if (monthYearMatch) {
        const monthKey = monthYearMatch[1].slice(0, 3).toLowerCase();
        const year = Number(monthYearMatch[2]);
        const monthIndex = monthMap[monthKey];

        if (!Number.isNaN(year) && monthIndex !== undefined) {
          return new Date(year, monthIndex, 1);
        }
      }

      const direct = new Date(value);
      return direct;
    };

    const enumerateMonths = (start: string, end: string): string[] => {
      const startDate = parseDate(start);
      const endDate = parseDate(end);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate > endDate) {
        return [];
      }

      const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      const limit = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
      const months: string[] = [];

      while (current <= limit) {
        months.push(`${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`);
        current.setMonth(current.getMonth() + 1);
      }

      return months;
    };

    professionalExperiences.forEach(exp => {
      enumerateMonths(exp.startDate, exp.endDate).forEach(month => activeMonths.add(month));
    });

    const expectedMonths = activeMonths.size;
    const expectedHours = expectedMonths * 160;
    const expectedProjects = projects.it.projects.length + professionalExperiences.length;

    expect(stats.hoursValue).toBe(expectedHours > 0 ? `${formatter.format(expectedHours)}+` : '0');
    expect(stats.hoursSuffix).toBe('ore di sviluppo');
    expect(stats.monthsValue).toBe(expectedMonths > 0 ? `${formatter.format(expectedMonths)}+` : '0');
    expect(stats.monthsSuffix).toBe('mesi su progetti reali');
    expect(stats.projectsValue).toBe(formatter.format(expectedProjects));
    expect(stats.projectsSuffix).toBe('contributi end-to-end');
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

  it('should expose detail text for each statistic', () => {
    fixture.detectChanges();

    expect(component.statistics.length).toBeGreaterThan(0);
    component.statistics.forEach((stat, index) => {
      expect(stat.detail.length).toBeGreaterThan(0);
      expect(stat.detail).toBe(statsData.it.stats[index].detail);
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
