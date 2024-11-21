import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { experiencesData } from '../../data/experiences.data';
import { projects } from '../../data/projects.data';
import { StatsItem, Stats } from '../../dtos/StatsDTO';

/**
 * Component for displaying statistics based on experiences and projects.
 */
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
export class StatsComponent implements OnInit {
  stats!: StatsItem;
  statistics: Stats[] = [];

  /**
   * Initializes the component and prepares statistics data.
   */
  ngOnInit(): void {
    this.stats = this.calculateStats(experiencesData.experiences, projects.projects);
    this.prepareStatistics();
  }

  /**
   * Prepares the statistics for rendering in the template.
   */
  prepareStatistics(): void {
    this.statistics = [
      { icon: 'history', value: this.stats.hours, label: 'Total Hours' },
      { icon: 'today', value: this.stats.months, label: 'Total Months' },
      { icon: 'work', value: this.stats.projects, label: 'Projects' },
      { icon: 'apps', value: this.stats.mostUsed, label: 'Most Used' }
    ];
  }

  /**
   * Calculates statistics such as hours, months, projects, and most used technologies.
   * @param experiences List of professional experiences.
   * @param projectList List of projects.
   * @returns Calculated statistics.
   */
  calculateStats(experiences: any[], projectList: any[]): StatsItem {
    let totalHours = 0;
    let totalMonths = 0;
    let totalProjects = projectList.length;
    let technologyCount: { [key: string]: number } = {};

    const experiencesWithTechnologies = experiences.filter(exp => exp.technologies && exp.technologies.trim().length > 0);
    totalProjects += experiencesWithTechnologies.length;

    experiencesWithTechnologies.forEach((exp, index) => {
      const months = this.calculateMonths(exp.startDate, exp.endDate);
      totalMonths += months;

      const weeks = months * 4;
      const hoursWorkedPerWeek = 40;
      let hoursWorked = weeks * hoursWorkedPerWeek;

      if (index === experiencesWithTechnologies.length - 1) {
        const extraHours = weeks;
        hoursWorked += extraHours;
      }

      totalHours += hoursWorked;

      const technologies = exp.technologies.split(', ').map((tech: any) => this.normalizeTechnology(tech));
      technologies.forEach((tech: any) => {
        technologyCount[tech] = (technologyCount[tech] || 0) + 1;
      });
    });

    const sortedTechnologies = Object.entries(technologyCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([tech]) => this.formatTechnology(tech));

    return {
      hours: `${Math.round(totalHours)} hours`,
      months: `${totalMonths} months`,
      projects: `${totalProjects} projects`,
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
    const endDate = new Date(end);
    return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
  }
}