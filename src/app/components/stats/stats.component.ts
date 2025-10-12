import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { experiencesData } from '../../data/experiences.data';
import { projects } from '../../data/projects.data';
import { TranslationService } from '../../services/translation.service';
import { Stat, StatsFull, StatsMetrics } from '../../dtos/StatsDTO';
import { Experience } from '../../dtos/ExperienceDTO';
import { Project } from '../../dtos/ProjectDTO';
import { statsData } from '../../data/stats.data';
import { LanguageCode } from '../../models/language-code.type';

interface DisplayStat {
  icon: string;
  label: string;
  value: string;
  suffix?: string;
  detail: string;
  items?: string[];
}

interface TranslatableStatsTemplate {
  title: string;
  stats: Array<Pick<Stat, 'label' | 'valueSuffix' | 'detail' | 'detailItems'>>;
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
  dialogScrollable = false;
  dialogAtEnd = false;

  private readonly destroy$ = new Subject<void>();
  private metricsCache: StatsMetrics | null = null;
  private lastFocusedElement: HTMLElement | null = null;
  private dialogBodyRef?: ElementRef<HTMLDivElement>;

  @ViewChild('detailCloseButton')
  set detailCloseButton(button: ElementRef<HTMLButtonElement> | undefined) {
    if (!button) {
      return;
    }

    setTimeout(() => {
      button.nativeElement.focus({ preventScroll: true });
    });
  }

  @ViewChild('dialogBody')
  set dialogBody(body: ElementRef<HTMLDivElement> | undefined) {
    this.dialogBodyRef = body;

    if (body) {
      setTimeout(() => this.evaluateDialogScrollState());
    }
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

          const translatableTemplate = this.buildTranslatableTemplate(baseTemplate, computed);

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
            detail: stat.detail,
            detailItems: stat.detailItems ?? []
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
    this.dialogScrollable = false;
    this.dialogAtEnd = false;

    setTimeout(() => this.evaluateDialogScrollState());
  }

  closeStatDetail(event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();

    if (!this.selectedStat) {
      return;
    }

    this.selectedStat = null;
    this.dialogScrollable = false;
    this.dialogAtEnd = false;

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

  @HostListener('window:resize')
  handleWindowResize(): void {
    if (!this.selectedStat) {
      return;
    }

    this.evaluateDialogScrollState();
  }

  calculateStats(
    experiences: Experience[],
    projectList: Project[],
    language: LanguageCode,
    template: StatsFull
  ): StatsMetrics {
    let totalHours = 0;
    let totalMonths = 0;
    let totalProjects = projectList.length;
    const technologyCount: Record<string, number> = {};

    const professionalExperiences = experiences.filter(exp => {
      const hasTechnologies = exp.technologies?.trim().length;
      const role = (exp.position ?? '').toLowerCase();
      const isTechRole = /(sviluppatore|developer)/.test(role);
      return Boolean(hasTechnologies && isTechRole);
    });

    totalProjects += professionalExperiences.length;

    const experienceItems: string[] = [];

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

      const technologies = (exp.technologies ?? '')
        .split(',')
        .map((tech) => this.normalizeTechnology(tech))
        .filter((tech): tech is string => tech.length > 0);
      technologies.forEach((tech) => {
        technologyCount[tech] = (technologyCount[tech] || 0) + 1;
      });

      const contribution = this.formatExperienceContribution(exp);
      if (contribution.trim().length) {
        experienceItems.push(contribution);
      }
    });

    const sortedTechnologies = Object.entries(technologyCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([tech]) => this.formatTechnology(tech));

    const projectItems = [
      ...projectList.map((project) => this.formatProjectContribution(project)),
      ...experienceItems
    ].filter((item): item is string => Boolean(item && item.trim().length));

    const locale = this.resolveLocale(language);
    const formatter = new Intl.NumberFormat(locale);

    return {
      hoursValue: `${formatter.format(Math.round(totalHours))}+`,
      hoursSuffix: template.stats[0]?.valueSuffix ?? 'ore di sviluppo',
      monthsValue: `${formatter.format(totalMonths)}+`,
      monthsSuffix: template.stats[1]?.valueSuffix ?? 'mesi su progetti reali',
      projectsValue: formatter.format(totalProjects),
      projectsSuffix: template.stats[2]?.valueSuffix ?? 'iniziative con contributo diretto',
      mostUsedValue: sortedTechnologies.join(' · '),
      mostUsedSuffix: template.stats[3]?.valueSuffix,
      detailItems: {
        hours: experienceItems,
        months: experienceItems,
        projects: projectItems,
        stack: sortedTechnologies
      }
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

  private formatExperienceContribution(experience: Experience): string {
    const location = (experience.location ?? '').trim();
    const locationPrimary = location.split('·')[0]?.trim() ?? '';
    const role = (experience.position ?? '').trim();
    const rolePrimary = role.split('·')[0]?.trim() ?? '';

    return locationPrimary || rolePrimary;
  }

  private formatProjectContribution(project: Project | undefined): string {
    if (!project) {
      return '';
    }

    const title = (project.title ?? '').trim();
    if (!title) {
      return '';
    }

    return title;
  }

  onDialogScroll(event: Event): void {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    this.updateDialogEdgeState(event.target);
  }

  private evaluateDialogScrollState(): void {
    const element = this.dialogBodyRef?.nativeElement;
    if (!element) {
      this.dialogScrollable = false;
      this.dialogAtEnd = false;
      return;
    }

    const scrollable = element.scrollHeight - element.clientHeight > 1;
    this.dialogScrollable = scrollable;
    this.updateDialogEdgeState(element);
  }

  private updateDialogEdgeState(element: HTMLElement): void {
    const isAtEnd = Math.ceil(element.scrollTop + element.clientHeight) >= element.scrollHeight;
    this.dialogAtEnd = isAtEnd || !this.dialogScrollable;
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
    translatedStat: Pick<Stat, 'label' | 'valueSuffix' | 'detail' | 'detailItems'>,
    metrics: StatsMetrics,
    index: number
  ): DisplayStat {
    const value = this.getMetricValueByIndex(metrics, index);
    const suffix = this.getMetricSuffixByIndex(metrics, index, translatedStat.valueSuffix);
    const detail = translatedStat.detail && translatedStat.detail.trim().length
      ? translatedStat.detail
      : baseStat.detail;
    const detailItems = this.getDetailItemsByIndex(metrics, index, translatedStat.detailItems);

    return {
      icon: baseStat.icon,
      label: translatedStat.label,
      value,
      detail,
      ...(suffix ? { suffix } : {}),
      ...(detailItems.length ? { items: detailItems } : {})
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

  private getDetailItemsByIndex(
    metrics: StatsMetrics,
    index: number,
    translatedItems?: string[]
  ): string[] {
    const sanitizedTranslated = this.sanitizeDetailItems(translatedItems);
    if (sanitizedTranslated.length) {
      return sanitizedTranslated;
    }

    return this.getMetricDetailItems(metrics, index);
  }

  private getMetricDetailItems(metrics: StatsMetrics, index: number): string[] {
    switch (index) {
      case 0:
        return metrics.detailItems.hours;
      case 1:
        return metrics.detailItems.months;
      case 2:
        return metrics.detailItems.projects;
      case 3:
        return metrics.detailItems.stack;
      default:
        return [];
    }
  }

  private sanitizeDetailItems(items?: string[]): string[] {
    if (!items) {
      return [];
    }

    return items
      .map(item => (item ?? '').trim())
      .filter((item): item is string => Boolean(item.length));
  }

  private buildTranslatableTemplate(template: StatsFull, metrics: StatsMetrics): TranslatableStatsTemplate {
    return {
      title: template.title,
      stats: template.stats.map(({ label, valueSuffix, detail }, index) => ({
        label,
        valueSuffix: valueSuffix ?? '',
        detail,
        detailItems: this.getMetricDetailItems(metrics, index)
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

  private resolveLocalizedContent<T>(
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

    for (const [language, content] of Object.entries(data)) {
      if (content) {
        return { content: content as T, language: language as LanguageCode };
      }
    }

    throw new Error('No data available for statistics');
  }
}
