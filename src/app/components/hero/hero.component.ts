import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { LandingMaskComponent } from '../landing-mask/landing-mask.component';
import { SocialComponent } from '../social/social.component';
import { CommonModule } from '@angular/common';
import { heroData as heroDataSource } from '../../data/hero.data';
import { TranslationService } from '../../services/translation.service';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { HeroFull } from '../../dtos/HeroDTO';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  heroData: HeroFull = heroDataSource.en;
  isLoading = true;
  @Output() navigateNextSection = new EventEmitter<void>();

  // Typing animation properties
  displayText = '';
  isWriting = true;
  currentTextIndex = 0;
  typingSpeed = 50;
  deletingSpeed = 50;
  delayBetweenTexts = 1000;
  isFinalText = false;

  // Flag to ensure that animation state is correctly managed
  isAnimating = false;

  // Store the timeout references to be able to clear them
  timeoutIds: ReturnType<typeof setTimeout>[] = []; // This will store both browser and Node.js timeout ids

  private readonly destroy$ = new Subject<void>();

  constructor(private translationService: TranslationService) { }

  ngOnInit() {
    this.translationService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isLoading = true;
        this.clearTimeOuts();
      });

    this.translationService.getTranslatedData<HeroFull>(heroDataSource)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.heroData = data;
        this.isLoading = false;
        this.resetAnimation();  // Reset animation before starting again
        setTimeout(() => {
          this.startTypingAnimation();  // Restart the animation after the reset
        }, 100);  // Small delay to ensure view updates before animation starts
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearTimeOuts();
  }

  // Resets animation state to start over
  resetAnimation() {
    // Clear any pending timeouts
    this.clearTimeOuts();

    this.displayText = '';             // Clear current displayed text
    this.isWriting = true;             // Ensure typing state
    this.currentTextIndex = 0;         // Start from the first text
    this.isFinalText = false;          // Ensure it's not the final text
    this.isAnimating = false;          // Reset animation flag
  }

  // Starts the typing animation
  startTypingAnimation() {
    if (this.isAnimating) return;  // Prevent animation if one is already in progress
    this.isAnimating = true;       // Set the flag that animation is in progress

    // Start the typing process
    this.typeText();
  }

  // Handles the typing of text
  typeText() {
    const currentText = this.heroData.texts[this.currentTextIndex];
    const textLength = currentText.length;

    if (this.isWriting) {
      if (this.displayText.length < textLength) {
        this.displayText += currentText[this.displayText.length];
        const timeoutId = setTimeout(() => this.typeText(), this.typingSpeed);  // Continue typing
        this.timeoutIds.push(timeoutId); // Store the timeout ID to clear it later
      } else {
        if (this.currentTextIndex === this.heroData.texts.length - 1) {
          this.isFinalText = true;
          this.isAnimating = false; // Animation finished
          return;
        } else {
          this.isWriting = false; // Switch to deleting state
          const timeoutId = setTimeout(() => this.typeText(), this.delayBetweenTexts); // Wait before deleting
          this.timeoutIds.push(timeoutId); // Store the timeout ID to clear it later
        }
      }
    } else {
      // Handle text deletion and move to next
      if (this.displayText.length > 0) {
        this.displayText = this.displayText.slice(0, -1); // Delete one character
        const timeoutId = setTimeout(() => this.typeText(), this.deletingSpeed); // Continue deleting
        this.timeoutIds.push(timeoutId); // Store the timeout ID to clear it later
      } else {
        this.isWriting = true;  // Start writing next text
        this.currentTextIndex++;
        const timeoutId = setTimeout(() => this.typeText(), this.typingSpeed);  // Continue typing
        this.timeoutIds.push(timeoutId); // Store the timeout ID to clear it later
      }
    }
  }

  // Clear all the timeouts
  clearTimeOuts() {
    for (let id of this.timeoutIds) {
      clearTimeout(id); // Clear all pending timeouts
    }
    this.timeoutIds = [];  // Reset the array
  }

  navigateToNextSection(): void {
  this.navigateNextSection.emit();
}
}