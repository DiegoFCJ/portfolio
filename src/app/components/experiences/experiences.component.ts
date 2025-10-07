import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Experience, ExperienceFull } from '../../dtos/ExperienceDTO';
import { experiencesData } from '../../data/experiences.data';
import { TranslationService } from '../../services/translation.service';

interface ExperienceTimelineItem extends Experience {
  formattedPeriod: string;
  responsibilityItems: string[];
}

interface ExperienceTimeline {
  title: string;
  experiences: ExperienceTimelineItem[];
}

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit, OnDestroy {
  experiences: ExperienceTimeline = {
    title: '',
    experiences: []
  };
  isLoading = true;

  private readonly destroy$ = new Subject<void>();
  private static readonly EN_DASH = ' – ';

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.translationService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isLoading = true;
      });

    this.translationService.getTranslatedData<ExperienceFull>(experiencesData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.experiences = this.buildTimeline(data);
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildTimeline(data: ExperienceFull): ExperienceTimeline {
    return {
      title: data.title,
      experiences: data.experiences.map((experience) => ({
        ...experience,
        formattedPeriod: this.formatPeriod(experience.startDate, experience.endDate),
        responsibilityItems: this.prepareResponsibilities(experience.responsibilityList)
      }))
    };
  }

  private formatPeriod(startDate?: string, endDate?: string): string {
    const start = (startDate ?? '').trim();
    const end = (endDate ?? '').trim();

    if (!start && !end) {
      return '';
    }

    if (!end) {
      return start;
    }

    const isCurrent = /present|presente|current|attuale/i.test(end);
    const formattedEnd = isCurrent ? end.charAt(0).toUpperCase() + end.slice(1) : end;

    if (!start) {
      return formattedEnd;
    }

    return `${start}${ExperiencesComponent.EN_DASH}${formattedEnd}`;
  }

  private prepareResponsibilities(responsibilityList?: string[]): string[] {
    return (responsibilityList ?? [])
      .map(item => item.trim())
      .filter(Boolean);
  }
}
