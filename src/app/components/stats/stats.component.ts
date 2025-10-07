import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
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
export class StatsComponent implements OnInit {
  stats: StatsItem = {
    months: "",
    projects: "",
    automations: "",
    coreStack: ""
  };
  statsTitle: string = "";
  statistics: Stat[] = []

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.translationService.currentLanguage$.subscribe(language => {
      const experiences = experiencesData.en.experiences;
      const projectList = projects.en.projects;
      this.statsTitle = statsData[language].title;
      this.stats = this.calculateStats(experiences, projectList);
      this.prepareStatistics(language);
    });
  }

  prepareStatistics(language: string): void {
    const labels = statsData[language]?.stats;

    if (labels) {
      this.statistics = labels.map((stat) => {
        const metricValue = stat.metric ? this.stats[stat.metric] : undefined;
        return metricValue ? { ...stat, value: metricValue } : stat;
      });
    } else {
      console.error(`Language ${language} not found in statsLabels.`);
    }
  }

  calculateStats(experiences: any[], projectList: any[]): StatsItem {
    let totalMonths = 0;
    let totalProjects = projectList.length;
    let technologyCount: { [key: string]: number } = {};
    let automationCount = 0;

    const experiencesWithTechnologies = experiences.filter(exp => exp.technologies?.trim().length);
    totalProjects += experiencesWithTechnologies.length;

    experiencesWithTechnologies.forEach((exp, index) => {
      const months = this.calculateMonths(exp.startDate, exp.endDate);
      totalMonths += months;

      const responsibilities = exp.responsibilities ?? "";
      const automationMatches = responsibilities.match(/automat(?:ed|es|ing|ion)?/gi);
      automationCount += automationMatches ? automationMatches.length : 0;

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
      months: `${totalMonths}+ months delivering value`,
      projects: `${totalProjects} projects delivered`,
      automations: `${automationCount}+ processes automated`,
      coreStack: sortedTechnologies.join(' · ')
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