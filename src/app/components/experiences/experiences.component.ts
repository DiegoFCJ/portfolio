import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExperienceFull } from '../../dtos/ExperienceDTO';
import { experiencesData } from '../../data/experiences.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit, OnDestroy {
  experiences: ExperienceFull = {
    title: '',
    experiences: []
  };
  isLoading = true;

  private readonly destroy$ = new Subject<void>();

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
        this.experiences = data;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
