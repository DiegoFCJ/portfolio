import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { skills } from '../../data/skills.data';
import { TranslationService } from '../../services/translation.service'; 

/**
 * Component to display and manage skills in a categorized and interactive format.
 * Supports mobile and desktop views, and dynamically adjusts to screen size.
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss', './skills.carousel.component.scss']
})
export class SkillsComponent implements OnInit {
  skillFull = skills;
  skillFullTitle!: string;
  sections: any[] = [];
  loading = true;
  isMobile = false;
  currentIndex = 0;

  constructor(private translationService: TranslationService) {}

  /**
   * Initializes the component:
   * - Subscribes to the translation service to fetch and apply translations.
   * - Checks if the current device is mobile.
   */
  ngOnInit(): void {
    this.translationService.currentLanguage$.subscribe(lang => {
      this.sections = this.skillFull.skills.map(section => ({
        ...section,
        title: section.title[lang],
        skills: section.skills.map(skill => ({ ...skill, clicked: false }))
      }));
      this.loading = false;
      this.skillFullTitle = this.skillFull.title[lang];
    });

    this.checkIfMobile();
  }

  /**
   * Listens to window resize events and updates the `isMobile` property accordingly.
   */
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkIfMobile();
  }

  /**
   * Checks if the current window size qualifies as mobile.
   */
  checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  /**
   * Moves to the next section in the skills carousel.
   */
  moveToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.sections.length;
  }

  /**
   * Moves to the previous section in the skills carousel.
   */
  moveToPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.sections.length) % this.sections.length;
  }

  /**
   * Toggles the clicked state of a skill and displays a popup message if clicked.
   * @param event The mouse event triggering the action.
   * @param skill The skill that was clicked.
   */
  onSkillClick(event: MouseEvent, skill: any): void {
    skill.clicked = !skill.clicked;

    if (skill.clicked) {
      const message = this.createPopupMessage(event.target as HTMLElement);
      setTimeout(() => message.remove(), 5000);
    }
  }

  /**
   * Creates a temporary popup message element and appends it to the DOM.
   * @param targetElement The HTML element where the popup will appear.
   * @returns The created popup message element.
   */
  createPopupMessage(targetElement: HTMLElement): HTMLElement {
    const message = document.createElement('div');
    message.classList.add('popup');
    message.style.cssText = `
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.2rem;
      font-weight: bold;
      z-index: 10;
      text-align: center;
      padding: 10px;
      border-radius: 10px;
    `;
    targetElement.parentElement?.appendChild(message);
    return message;
  }
}