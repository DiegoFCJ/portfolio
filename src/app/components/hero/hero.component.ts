import { Component, OnInit } from '@angular/core';
import { writeFileSync } from 'fs'; // Importa il modulo per salvare su file
import { LandingMaskComponent } from '../landing-mask/landing-mask.component';
import { SocialComponent } from '../social/social.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    LandingMaskComponent,
    SocialComponent
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  texts = [
    "Hi! Welcome to my portfolio!", 
    "My name is Diego Fois", 
    "I'm a Student", 
    "I'm a Developer"
  ];

  displayText = "";
  isWriting = true;
  currentTextIndex = 0;
  typingSpeed = 50;
  deletingSpeed = 50;
  delayBetweenTexts = 1000;
  totalTime = 0; // Variabile per il tempo totale

  ngOnInit() {
    this.calculateTotalAnimationTime();
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
      } else if (this.displayText.length > 0) {
        this.displayText = this.displayText.slice(0, -1);
        setTimeout(() => this.startTypingAnimation(), this.deletingSpeed);
      } else {
        this.isWriting = true;
        this.currentTextIndex++;
        setTimeout(() => this.startTypingAnimation(), this.typingSpeed);
      }
    }
  }

  calculateTotalAnimationTime() {
    this.totalTime = this.texts.reduce((total, text, index) => {
      const textLength = text.length;
      const writeTime = textLength * this.typingSpeed;
      const deleteTime = index === 2 ? 7 * this.deletingSpeed : textLength * this.deletingSpeed; // Special case for "I'm a "
      return total + writeTime + deleteTime + this.delayBetweenTexts;
    }, 0);

    this.saveTotalTimeToFile(this.totalTime);
  }

  saveTotalTimeToFile(totalTime: number) {
    const filePath = './data/animationTime.txt';
    const fileContent = `Total Animation Time: ${totalTime} ms`;

    // Salva il tempo in un file
    writeFileSync(filePath, fileContent, 'utf8');
    console.log(`Total animation time saved to ${filePath}`);
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}