import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { experiencesData } from '../../data/experiences.data';
import { projects } from '../../data/projects.data';
import { TranslationService } from '../../services/translation.service';
import { Stat, StatsFull, StatsMetrics } from '../../dtos/StatsDTO';
import { statsData } from '../../data/stats.data';
import { LanguageCode } from '../../models/language-code.type';

interface DisplayStat {
  icon: string;
  label: string;
  value: string;
  suffix?: string;
  detail: string;
}

interface TranslatableStatsTemplate {
  title: string;
  stats: Array<Pick<Stat, 'label' | 'valueSuffix' | 'detail'>>;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {
  metrics: StatsMetrics | null = null;
  statsTitle: string = '';
  statistics: DisplayStat[] = [];
  isLoading = true;
  selectedStat: DisplayStat | null = null;
  closeButtonLabel = 'Chiudi';

  private readonly destroy$ = new Subject<void>();
  private metricsCache: StatsMetrics | null = null;
  private lastFocusedElement: HTMLElement | null = null;

  @ViewChild('detailCloseButton')
  set detailCloseButton(button: ElementRef<HTMLButtonElement> | undefined) {
    if (!button) {
      return;
    }

    setTimeout(() => {
      button.nativeElement.focus({ preventScroll: true });
    });
  }

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.translationService.currentLanguage$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(language => {
          const experiencesSource = this.resolveLocalizedContent(experiencesData);
          const projectsSource = this.resolveLocalizedContent(projects);
          const statsTemplateSource = this.resolveLocalizedContent(statsData);
          const baseTemplate = statsTemplateSource.content;

          const computed = this.metricsCache ?? (
            this.metricsCache = this.calculateStats(
              experiencesSource.content.experiences,
              projectsSource.content.projects,
              statsTemplateSource.language,
              baseTemplate
            )
          );

          const translatableTemplate = this.buildTranslatableTemplate(baseTemplate);

          return this.translationService
            .translateContent<TranslatableStatsTemplate>(
              translatableTemplate,
              statsTemplateSource.language,
              language
            )
            .pipe(
              map((translatedTemplate) => ({
                translatedTemplate,
                baseTemplate,
                computed,
                targetLanguage: language
              }))
            );
        })
      )
      .subscribe(({ translatedTemplate, baseTemplate, computed, targetLanguage }) => {
        this.statsTitle = translatedTemplate.title;
        this.metrics = computed;
        this.statistics = baseTemplate.stats.map((stat, index) => {
          const translatedStat = translatedTemplate.stats[index] ?? {
            label: stat.label,
            valueSuffix: stat.valueSuffix ?? '',
            detail: stat.detail
          };

          return this.buildDisplayStat(stat, translatedStat, computed, index);
        });
        this.isLoading = false;
        this.closeButtonLabel = this.resolveCloseLabel(targetLanguage);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openStatDetail(stat: DisplayStat, triggerElement?: EventTarget | null): void {
    if (triggerElement instanceof HTMLElement) {
      this.lastFocusedElement = triggerElement;
    }

    this.selectedStat = stat;
  }

  closeStatDetail(event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();

    if (!this.selectedStat) {
      return;
    }

    this.selectedStat = null;

    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus({ preventScroll: true });
      this.lastFocusedElement = null;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    if (!this.selectedStat) {
      return;
    }

    event.preventDefault();
    this.closeStatDetail();
  }

  calculateStats(
    experiences: any[],
    projectList: any[],
    language: LanguageCode,
    template: StatsFull
  ): StatsMetrics {
    let totalHours = 0;
    let totalMonths = 0;
    let totalProjects = projectList.length;
    let technologyCount: { [key: string]: number } = {};

    const professionalExperiences = experiences.filter(exp => {
      const hasTechnologies = exp.technologies?.trim().length;
      const role = (exp.position ?? '').toLowerCase();
      const isTechRole = /(sviluppatore|developer)/.test(role);
      return Boolean(hasTechnologies && isTechRole);
    });

    totalProjects += professionalExperiences.length;

    professionalExperiences.forEach((exp, index) => {
      const months = this.calculateMonths(exp.startDate, exp.endDate);
      totalMonths += months;

      const weeks = months * 4;
      const hoursWorkedPerWeek = 40;
      let hoursWorked = weeks * hoursWorkedPerWeek;

      if (index === professionalExperiences.length - 1) {
        hoursWorked += hoursWorkedPerWeek; // add one week of hours
      }

      totalHours += hoursWorked;

      const technologies = exp.technologies.split(', ').map(this.normalizeTechnology);
      technologies.forEach((tech: any) => {
        technologyCount[tech] = (technologyCount[tech] || 0) + 1;
      });
    });

    const sortedTechnologies = Object.entries(technologyCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([tech]) => this.formatTechnology(tech));

    const locale = this.resolveLocale(language);
    const formatter = new Intl.NumberFormat(locale);

    return {
      hoursValue: `${formatter.format(Math.round(totalHours))}+`,
      hoursSuffix: template.stats[0]?.valueSuffix ?? 'ore di sviluppo',
      monthsValue: `${formatter.format(totalMonths)}+`,
      monthsSuffix: template.stats[1]?.valueSuffix ?? 'mesi su progetti reali',
      projectsValue: formatter.format(totalProjects),
      projectsSuffix: template.stats[2]?.valueSuffix ?? 'progetti seguiti end-to-end',
      mostUsedValue: sortedTechnologies.join(' · '),
      mostUsedSuffix: template.stats[3]?.valueSuffix
    };
  }

  /**
   * Normalizes a technology name by removing version numbers and extra characters.
   * @param tech The technology name to normalize.
   * @returns Normalized technology name.
   */
  normalizeTechnology(tech: string): string {
    return tech
      .replace(/\([^)]*\)/g, '')
      .replace(/\d+/g, '')
      .trim()
      .toLowerCase();
  }

  /**
   * Formats a technology name to capitalize its first letter and handle special cases.
   * @param tech The technology name to format.
   * @returns Formatted technology name.
   */
  formatTechnology(tech: string): string {
    return tech
      .split(' ')
      .map(word => word.toUpperCase().includes('SQL') ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Calculates the number of months between two dates.
   * @param start Start date in string format.
   * @param end End date in string format.
   * @returns Number of months.
   */
  calculateMonths(start: string, end: string): number {
    const startDate = this.parseDate(start);
    const endDate = this.parseDate(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return 0;
    }

    return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
  }

  private parseDate(value: string): Date {
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
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      dec: 11
    };

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
    if (!isNaN(direct.getTime())) {
      return direct;
    }

    return direct;
  }

  private buildDisplayStat(
    baseStat: Stat,
    translatedStat: Pick<Stat, 'label' | 'valueSuffix' | 'detail'>,
    metrics: StatsMetrics,
    index: number
  ): DisplayStat {
    const value = this.getMetricValueByIndex(metrics, index);
    const suffix = this.getMetricSuffixByIndex(metrics, index, translatedStat.valueSuffix);
    const detail = translatedStat.detail && translatedStat.detail.trim().length
      ? translatedStat.detail
      : baseStat.detail;

    return {
      icon: baseStat.icon,
      label: translatedStat.label,
      value,
      detail,
      ...(suffix ? { suffix } : {})
    };
  }

  private getMetricValueByIndex(metrics: StatsMetrics, index: number): string {
    switch (index) {
      case 0:
        return metrics.hoursValue;
      case 1:
        return metrics.monthsValue;
      case 2:
        return metrics.projectsValue;
      case 3:
        return metrics.mostUsedValue;
      default:
        return '';
    }
  }

  private getMetricSuffixByIndex(
    metrics: StatsMetrics,
    index: number,
    translatedSuffix?: string
  ): string {
    let fallback = '';

    switch (index) {
      case 0:
        fallback = metrics.hoursSuffix;
        break;
      case 1:
        fallback = metrics.monthsSuffix;
        break;
      case 2:
        fallback = metrics.projectsSuffix;
        break;
      case 3:
        fallback = metrics.mostUsedSuffix ?? '';
        break;
    }

    if (translatedSuffix && translatedSuffix.trim().length) {
      return translatedSuffix;
    }

    return fallback ?? '';
  }

  private buildTranslatableTemplate(template: StatsFull): TranslatableStatsTemplate {
    return {
      title: template.title,
      stats: template.stats.map(({ label, valueSuffix, detail }) => ({
        label,
        valueSuffix: valueSuffix ?? '',
        detail
      }))
    };
  }

  private resolveCloseLabel(language: LanguageCode): string {
    switch (language) {
      case 'en':
        return 'Close detail';
      case 'de':
        return 'Detail schließen';
      case 'es':
        return 'Cerrar detalle';
      case 'it':
      default:
        return 'Chiudi dettaglio';
    }
  }

  private resolveLocale(language: LanguageCode): string {
    switch (language) {
      case 'en':
        return 'en-US';
      case 'de':
        return 'de-DE';
      case 'es':
        return 'es-ES';
      case 'it':
      default:
        return 'it-IT';
    }
  }

  private resolveLocalizedContent<T extends { [key: string]: any }>(
    data: Partial<Record<LanguageCode, T>>
  ): { content: T; language: LanguageCode } {
    const preferred: LanguageCode = 'it';
    const preferredContent = data[preferred];
    if (preferredContent) {
      return { content: preferredContent, language: preferred };
    }

    const fallbackOrder: LanguageCode[] = ['en', 'de', 'es'];
    for (const fallback of fallbackOrder) {
      const content = data[fallback];
      if (content) {
        return { content, language: fallback };
      }
    }

    const firstEntry = Object.entries(data)[0];
    if (firstEntry) {
      return { content: firstEntry[1] as T, language: firstEntry[0] as LanguageCode };
    }

    throw new Error('No data available for statistics');
  }
}
