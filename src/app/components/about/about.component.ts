import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    title: '',
    description: ''
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

    this.translationService.getTranslatedData<AboutMe>(aboutMeData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.aboutMe = data;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
