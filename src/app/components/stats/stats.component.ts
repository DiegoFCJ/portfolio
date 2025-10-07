import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { experiencesData } from '../../data/experiences.data';
import { projects as projectsData } from '../../data/projects.data';
import { TranslationService } from '../../services/translation.service';
import { Stat, StatsItem, StatsFull } from '../../dtos/StatsDTO';
import { statsData } from '../../data/stats.data';
import { Subscription } from 'rxjs';

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
  stats: StatsItem = { hours: '', months: '', projects: '', mostUsed: '' };
  statsTitle = statsData.en.title;
  statistics: Stat[] = [];
  isLoading = true;

  private readonly subscriptions = new Subscription();

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    const experiences = experiencesData.en.experiences;
    const projectList = projectsData.en.projects;
    this.stats = this.calculateStats(experiences, projectList);

    this.subscriptions.add(
      this.translationService.currentLanguage$.subscribe(() => {
        this.isLoading = true;
      })
    );

    this.subscriptions.add(
      this.translationService.getTranslatedData<StatsFull>(statsData).subscribe((data) => {
        this.statsTitle = data.title;
        this.statistics = data.stats.map((stat, index) => ({
          ...stat,
          value: this.valueForIndex(index)
        }));
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private valueForIndex(index: number): string {
    switch (index) {
      case 0:
        return this.stats.hours;
      case 1:
        return this.stats.months;
      case 2:
        return this.stats.projects;
      case 3:
        return this.stats.mostUsed;
      default:
        return '';
    }
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
      hours: `${Math.round(totalHours)}`,
      months: `${totalMonths}`,
      projects: `${totalProjects}`,
      mostUsed: sortedTechnologies.join(', ')
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
    let endDate: Date;

    if (typeof end === 'string' && end.trim().toLowerCase() === 'current') {
      endDate = new Date();
    } else {
      endDate = new Date(end);
      if (Number.isNaN(endDate.getTime())) {
        endDate = new Date();
      }
    }

    return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
  }
}
