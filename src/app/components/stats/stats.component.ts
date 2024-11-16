import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Stats } from '../../dtos/StatsDTO';
import { experiencesData } from '../../data/experiences.data';
import { projects } from '../../data/projects.data';
import { CommonModule } from '@angular/common';

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
  stats!: Stats;
  statistics: { icon: string, value: string, label: string }[] = [];

  ngOnInit(): void {
    this.stats = this.calculateStats(experiencesData, projects);
    this.prepareStatistics();
  }

  prepareStatistics(): void {
    this.statistics = [
      { icon: 'history', value: this.stats.hours, label: 'Total Hours' },
      { icon: 'today', value: this.stats.months, label: 'Total Months' },
      { icon: 'work', value: this.stats.projects, label: 'Projects' },
      { icon: 'apps', value: this.stats.mostUsed, label: 'Most Used' }
    ];
  }

  calculateStats(experiences: any[], projectList: any[]): Stats {
    let totalHours = 0;
    let totalMonths = 0;
    let totalProjects = projectList.length; // Projects from projects.data
    let technologyCount: { [key: string]: number } = {};

    // Filter experiences with technologies and calculate
    const experiencesWithTechnologies = experiences.filter(exp => exp.technologies && exp.technologies.trim().length > 0);
    totalProjects += experiencesWithTechnologies.length; // Add projects from experiences

    experiencesWithTechnologies.forEach((exp, index) => {
      // Calculate months
      const months = this.calculateMonths(exp.startDate, exp.endDate);
      totalMonths += months;

      // Calculate hours
      const weeks = months * 4; // Assume 4 weeks per month
      const hoursWorkedPerWeek = 40; // 40 hours a week
      let hoursWorked = weeks * hoursWorkedPerWeek;

      // Add extra hours for the last experience
      if (index === experiencesWithTechnologies.length - 1) {
        const extraHours = weeks; // 1 extra hour per day = 1 week extra
        hoursWorked += extraHours;
      }

      totalHours += hoursWorked;

      // Normalize and count technologies
      const technologies = exp.technologies.split(', ').map((tech: any) => this.normalizeTechnology(tech));
      technologies.forEach((tech: any) => {
        technologyCount[tech] = (technologyCount[tech] || 0) + 1;
      });
    });

    // Find top 4 technologies
    const sortedTechnologies = Object.entries(technologyCount)
      .sort(([, a], [, b]) => b - a) // Sort by count descending
      .slice(0, 4) // Take top 4
      .map(([tech]) => this.formatTechnology(tech)); // Format technology names

    return {
      hours: `${Math.round(totalHours)} hours`,
      months: `${totalMonths} months`,
      projects: `${totalProjects} projects`,
      mostUsed: sortedTechnologies.join(', ') // Return the top 4 technologies
    };
  }

  normalizeTechnology(tech: string): string {
    // Rimuove versioni (es. "Java 8" -> "Java") e parentesi
    return tech
      .replace(/\([^)]*\)/g, '') // Rimuove tutto tra parentesi
      .replace(/\d+/g, '')      // Rimuove numeri
      .trim()                   // Rimuove spazi extra
      .toLowerCase();           // Normalizza tutto in minuscolo
  }

  formatTechnology(tech: string): string {
    // Capitalize first letter of each word, always capitalize "SQL"
    return tech
      .split(' ')
      .map(word => word.toUpperCase().includes('SQL') ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  calculateMonths(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1; // +1 to include the start month
  }
}