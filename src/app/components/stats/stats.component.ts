import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { forkJoin, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { experiencesData } from '../../data/experiences.data';
import { projects } from '../../data/projects.data';
import { TranslationService } from '../../services/translation.service';
import { Stat, StatsItem } from '../../dtos/StatsDTO';
import { statsData } from '../../data/stats.data';

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
          const experiences = experiencesData.en.experiences;
          const projectList = projects.en.projects;
          const computed = this.calculateStats(experiences, projectList);

          return forkJoin({
            template: this.translationService.translateContent(statsData.en, 'en', language),
            computed: this.translationService.translateContent(computed, 'en', language)
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

  calculateStats(experiences: any[], projectList: any[]): StatsItem {
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

    return {
      hours: `${Math.round(totalHours)}+ engineering hours delivered`,
      months: `${totalMonths}+ months across enterprise projects`,
      projects: `${totalProjects} end-to-end initiatives led`,
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
}
