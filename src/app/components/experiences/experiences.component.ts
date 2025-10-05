import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
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
    title: "",
    experiences: [{
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      technologies: "",
      responsibilities: ""
    }]
  };
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.translationService.currentLanguage$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.isLoading = true),
        switchMap(() => this.translationService.getTranslatedData<ExperienceFull>(experiencesData))
      )
      .subscribe(translated => {
        this.experiences = translated;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
