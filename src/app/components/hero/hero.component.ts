import { Component, OnInit } from '@angular/core';
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
  isWriting = true; // Controlla se sta scrivendo o cancellando
  currentTextIndex = 0; // Indice del testo corrente
  typingSpeed = 50; // Velocità della macchina da scrivere
  deletingSpeed = 50; // Velocità di cancellazione
  delayBetweenTexts = 1000; // Ritardo di 2 secondi
  isFinalText = false; // Flag per fermare l'animazione dopo l'ultimo testo

  ngOnInit() {
    this.startTypingAnimation();
  }

  startTypingAnimation() {
    const currentText = this.texts[this.currentTextIndex];
    const textLength = currentText.length;

    if (this.isWriting) {
      // Se stiamo scrivendo, aggiungiamo una lettera alla volta
      if (this.displayText.length < textLength) {
        this.displayText += currentText[this.displayText.length];
        setTimeout(() => this.startTypingAnimation(), this.typingSpeed);
      } else {
        // Se il testo è completo, attendi e poi avvia la cancellazione o fermati
        if (this.currentTextIndex === this.texts.length - 1) {
          this.isFinalText = true;
          return; // Ferma l'animazione sull'ultimo testo
        } else {
          this.isWriting = false;
          setTimeout(() => this.startTypingAnimation(), this.delayBetweenTexts);
        }
      }
    } else {
      // Se siamo al testo 3 ("I'm a Student") e cancelliamo solo "Student"
      if (this.currentTextIndex === 2 && this.displayText === "I'm a ") {
        this.isWriting = true;
        this.currentTextIndex++;
        setTimeout(() => this.startTypingAnimation(), this.typingSpeed);
      }
      // Cancellazione di una lettera alla volta per il resto dei testi
      else if (this.displayText.length > 0) {
        this.displayText = this.displayText.slice(0, -1);
        setTimeout(() => this.startTypingAnimation(), this.deletingSpeed);
      } else {
        // Passa al testo successivo e riprendi a scrivere
        this.isWriting = true;
        this.currentTextIndex++;
        setTimeout(() => this.startTypingAnimation(), this.typingSpeed);
      }
    }
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}