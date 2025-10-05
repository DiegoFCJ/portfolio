import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { EducationFull } from '../../dtos/EducationDTO';
import { educationData } from '../../data/education.data';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

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

  isLargeScreen: boolean = false;
  is2kMoreScreen: boolean = false;
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(private translationService: TranslationService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isLargeScreen = event.target.innerWidth >= 1497;
    this.is2kMoreScreen = event.target.innerWidth >= 2224;
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isLargeScreen = window.innerWidth >= 1497;
      this.is2kMoreScreen = window.innerWidth >= 2224;
    }
    this.translationService.currentLanguage$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.isLoading = true),
        switchMap(() => this.translationService.getTranslatedData<EducationFull>(educationData))
      )
      .subscribe(translated => {
        this.educationList = translated;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resizeConditions(i: number, last: boolean): string | null {
    if ((this.isLargeScreen && (i === 2 || last)) || (!this.isLargeScreen && last) || this.is2kMoreScreen) {
      return 'full-height';
    }
    return null;
  }
}