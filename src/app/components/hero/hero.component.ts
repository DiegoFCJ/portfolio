import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { heroData } from '../../data/hero.data';
import { HeroFull } from '../../dtos/HeroDTO';
import { TranslationService } from '../../services/translation.service';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { LandingMaskComponent } from '../landing-mask/landing-mask.component';
import { SocialComponent } from '../social/social.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    LandingMaskComponent,
    SocialComponent,
    CustomPopupComponent,
    CommonModule
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  heroData: HeroFull = heroData.en;
  @Output() navigateNextSection = new EventEmitter<void>();
  isLoading = true;

  displayText = '';
  isWriting = true;
  currentTextIndex = 0;
  typingSpeed = 50;
  deletingSpeed = 50;
  delayBetweenTexts = 1000;
  isFinalText = false;
  isAnimating = false;
  timeoutIds: ReturnType<typeof setTimeout>[] = [];

  private destroy$ = new Subject<void>();

  constructor(private translationService: TranslationService) { }

  ngOnInit() {
    this.translationService.currentLanguage$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.isLoading = true;
          this.resetAnimation();
        }),
        switchMap(() => this.translationService.getTranslatedData<HeroFull>(heroData))
      )
      .subscribe(translated => {
        this.heroData = translated;
        this.isLoading = false;
        const timeoutId = setTimeout(() => {
          this.startTypingAnimation();
        }, 100);
        this.timeoutIds.push(timeoutId);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearTimeOuts();
  }

  resetAnimation() {
    this.clearTimeOuts();
    this.displayText = '';
    this.isWriting = true;
    this.currentTextIndex = 0;
    this.isFinalText = false;
    this.isAnimating = false;
  }

  startTypingAnimation() {
    if (this.isAnimating || this.isLoading) {
      return;
    }
    this.isAnimating = true;
    this.typeText();
  }

  typeText() {
    if (this.isLoading) {
      return;
    }

    const currentText = this.heroData.texts[this.currentTextIndex];
    const textLength = currentText.length;

    if (this.isWriting) {
      if (this.displayText.length < textLength) {
        this.displayText += currentText[this.displayText.length];
        const timeoutId = setTimeout(() => this.typeText(), this.typingSpeed);
        this.timeoutIds.push(timeoutId);
      } else {
        if (this.currentTextIndex === this.heroData.texts.length - 1) {
          this.isFinalText = true;
          this.isAnimating = false;
          return;
        } else {
          this.isWriting = false;
          const timeoutId = setTimeout(() => this.typeText(), this.delayBetweenTexts);
          this.timeoutIds.push(timeoutId);
        }
      }
    } else {
      if (this.displayText.length > 0) {
        this.displayText = this.displayText.slice(0, -1);
        const timeoutId = setTimeout(() => this.typeText(), this.deletingSpeed);
        this.timeoutIds.push(timeoutId);
      } else {
        this.isWriting = true;
        this.currentTextIndex++;
        const timeoutId = setTimeout(() => this.typeText(), this.typingSpeed);
        this.timeoutIds.push(timeoutId);
      }
    }
  }

  clearTimeOuts() {
    for (let id of this.timeoutIds) {
      clearTimeout(id);
    }
    this.timeoutIds = [];
  }

  navigateToNextSection(): void {
    this.navigateNextSection.emit();
  }
}
