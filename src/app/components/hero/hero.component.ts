import { Component, OnInit, ViewChild } from '@angular/core';
import { LandingMaskComponent } from '../landing-mask/landing-mask.component';
import { SocialComponent } from '../social/social.component';
import { CommonModule } from '@angular/common';
import { heroData } from '../../data/hero.data';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';

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
export class HeroComponent implements OnInit {
  heroData = heroData;

  // Typing animation properties
  displayText = '';
  isWriting = true;
  currentTextIndex = 0;
  typingSpeed = 50;
  deletingSpeed = 50;
  delayBetweenTexts = 1000;
  isFinalText = false;
  popupMessage = 'Work in progress...';
  @ViewChild(CustomPopupComponent) customPopup: CustomPopupComponent | undefined;

  ngOnInit() {
    this.startTypingAnimation();
  }

  // Starts the typing animation
  startTypingAnimation() {
    const currentText = this.heroData.texts[this.currentTextIndex];
    const textLength = currentText.length;

    if (this.isWriting) {
      if (this.displayText.length < textLength) {
        this.displayText += currentText[this.displayText.length];
        setTimeout(() => this.startTypingAnimation(), this.typingSpeed);
      } else {
        if (this.currentTextIndex === this.heroData.texts.length - 1) {
          this.isFinalText = true;
          return;
        } else {
          this.isWriting = false;
          setTimeout(() => this.startTypingAnimation(), this.delayBetweenTexts);
        }
      }
    } else {
      if (this.currentTextIndex === 2 && this.displayText === "I'm a ") {
        this.isWriting = true;
        this.currentTextIndex++;
        setTimeout(() => this.startTypingAnimation(), this.typingSpeed);
      }
      else if (this.displayText.length > 0) {
        this.displayText = this.displayText.slice(0, -1);
        setTimeout(() => this.startTypingAnimation(), this.deletingSpeed);
      } else {
        this.isWriting = true;
        this.currentTextIndex++;
        setTimeout(() => this.startTypingAnimation(), this.typingSpeed);
      }
    }
  }

  showPopup(message: string): void {
    if (this.customPopup) {
      this.customPopup.togglePopup(message);
    }
  }
}
