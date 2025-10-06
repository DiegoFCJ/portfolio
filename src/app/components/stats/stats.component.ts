import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { experiencesData } from '../../data/experiences.data';
import { projects } from '../../data/projects.data';
import { LanguageCode, TranslationService } from '../../services/translation.service';
import { Stat, StatsFull, StatsItem } from '../../dtos/StatsDTO';
import { statsData } from '../../data/stats.data';
import { LanguageCode } from '../../models/language-code.type';

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
  stats: StatsItem = {
    hours: '',
    months: '',
    projects: '',
    mostUsed: ''
  };
  statsTitle: string = '';
  statistics: Stat[] = [];
  isLoading = true;

  private readonly destroy$ = new Subject<void>();

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

          const computed = this.calculateStats(
            experiencesSource.content.experiences,
            projectsSource.content.projects
          );

          return forkJoin({
            template: this.translationService.translateContent(
              statsTemplateSource.content,
              statsTemplateSource.language,
              language
            ),
            computed: this.translationService.translateContent(
              computed,
              'it',
              language
            )
          });
        })
      )
      .subscribe(({ template, computed }) => {
        this.statsTitle = template.title;
        this.stats = computed;
        this.statistics = template.stats.map((stat, index) => ({
          ...stat,
          value: this.getStatValueByIndex(computed, index)
        }));
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  calculateStats(experiences: any[], projectList: any[], language: LanguageCode = 'en'): StatsItem {
    let totalHours = 0;
    let totalMonths = 0;
    let totalProjects = projectList.length;
    let technologyCount: { [key: string]: number } = {};

    const experiencesWithTechnologies = experiences.filter(exp => exp.technologies?.trim().length);
    totalProjects += experiencesWithTechnologies.length;

    experiencesWithTechnologies.forEach((exp, index) => {
      const months = this.calculateMonths(exp.startDate, exp.endDate);
      totalMonths += months;

      const weeks = months * 4;
      const hoursWorkedPerWeek = 40;
      let hoursWorked = weeks * hoursWorkedPerWeek;

      if (index === experiencesWithTechnologies.length - 1) {
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

    if (language === 'it') {
      return {
        hours: `${Math.round(totalHours)}+ ore di ingegneria erogate`,
        months: `${totalMonths}+ mesi su progetti enterprise`,
        projects: `${totalProjects} iniziative end-to-end gestite`,
        mostUsed: sortedTechnologies.join(' · ')
      };
    }

    return {
      hours: `${Math.round(totalHours)}+ ore di ingegneria erogate`,
      months: `${totalMonths}+ mesi su progetti enterprise`,
      projects: `${totalProjects} iniziative end-to-end guidate`,
      mostUsed: sortedTechnologies.join(' · ')
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
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
  }

  private getStatValueByIndex(stats: StatsItem, index: number): string {
    switch (index) {
      case 0:
        return stats.hours;
      case 1:
        return stats.months;
      case 2:
        return stats.projects;
      case 3:
        return stats.mostUsed;
      default:
        return '';
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
