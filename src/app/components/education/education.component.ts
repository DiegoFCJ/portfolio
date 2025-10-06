import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EducationFull } from '../../dtos/EducationDTO';
import { educationData } from '../../data/education.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnDestroy {
  educationList: EducationFull = {
    title: '',
    education: []
  };
  isLoading = true;

  private readonly destroy$ = new Subject<void>();

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isLoading = true;
      });

    this.translationService.getTranslatedData<EducationFull>(educationData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.educationList = data;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
