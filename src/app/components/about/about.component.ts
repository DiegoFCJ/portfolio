import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { aboutMeData } from '../../data/about-me.data';
import { AboutMe } from '../../dtos/AboutMeDTO';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  aboutMe: AboutMe = {
    title: "",
    description: "",
  };
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.currentLanguage$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.isLoading = true),
        switchMap(() => this.translationService.getTranslatedData<AboutMe>(aboutMeData))
      )
      .subscribe(translated => {
        this.aboutMe = translated;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
