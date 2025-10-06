import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { StatsItem } from '../../dtos/StatsDTO';
import { experiencesData } from '../../data/experiences.data';
import { projects } from '../../data/projects.data';
import { TranslationService } from '../../services/translation.service';
import { BehaviorSubject, of } from 'rxjs';

class MockTranslationService {
  private readonly languageSubject = new BehaviorSubject<'en' | 'it' | 'de' | 'es'>('en');
  readonly currentLanguage$ = this.languageSubject.asObservable();

  translateContent<T>(content: T, _source: string, _target?: string) {
    return of(content);
  }

  setLanguage(language: 'en' | 'it' | 'de' | 'es') {
    this.languageSubject.next(language);
  }
}

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
    expect(component.statistics[0].label).toBe('Total Hours');
    expect(component.statistics[1].label).toBe('Experience Months');
    expect(component.statistics[2].label).toBe('Projects Delivered');
    expect(component.statistics[3].label).toBe('Core Stack');
  });

  /**
   * Verifies that calculateStats computes correct statistics based on test data.
   */
  it('should calculate correct stats', () => {
    const stats: StatsItem = component.calculateStats(
      experiencesData.en.experiences,
      projects.en.projects
    );

    expect(stats.hours).toBe('7240+ engineering hours delivered');
    expect(stats.months).toBe('45+ months across enterprise projects');
    expect(stats.projects).toBe('8 end-to-end initiatives led');
    expect(stats.mostUsed).toContain('·');
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
      experiencesData.en.experiences,
      projects.en.projects
    );

    expect(component.statistics.length).toBe(4);
    expect(component.statistics[0].value).toBe(computedStats.hours);
    expect(component.statistics[1].value).toBe(computedStats.months);
    expect(component.statistics[2].value).toBe(computedStats.projects);
    expect(component.statistics[3].value).toBe(computedStats.mostUsed);
  });
});
