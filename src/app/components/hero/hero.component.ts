import { Component, OnInit } from '@angular/core';
import { LandingMaskComponent } from '../landing-mask/landing-mask.component';
import { SocialComponent } from '../social/social.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    LandingMaskComponent,
    SocialComponent,
    CommonModule
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  texts = [
    "Hi! My name is Diego Fois", 
    "Welcome to my portfolio!", 
    "I'm a Student", 
    "I'm a Developer"
  ];

  displayText = "";
  isWriting = true;
  currentTextIndex = 0;
  typingSpeed = 50;
  deletingSpeed = 50; 
  delayBetweenTexts = 1000;
  isFinalText = false;

  ngOnInit() {
    this.startTypingAnimation();
  }

  startTypingAnimation() {
    const currentText = this.texts[this.currentTextIndex];
    const textLength = currentText.length;

    if (this.isWriting) {
      if (this.displayText.length < textLength) {
        this.displayText += currentText[this.displayText.length];
        setTimeout(() => this.startTypingAnimation(), this.typingSpeed);
      } else {

        if (this.currentTextIndex === this.texts.length - 1) {
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

  scrollToSection(sectionId: string) {
    this.togglePopup()
  }


  isPopupVisible = false;
  popupText = "Work in progress...";

  togglePopup() {
    if (!this.isPopupVisible) {
      this.isPopupVisible = true;

      setTimeout(() => {
        this.isPopupVisible = false;
      }, 3000);
    }
  }
}