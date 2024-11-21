import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { skills } from '../../data/skills.data';
import { Skill } from '../../dtos/SkillDTO';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss', './skills.carousel.component.scss']
})
export class SkillsComponent implements OnInit {
  skillFull = skills;
  sections: Skill[] = [];
  loading = true;
  isMobile = false;
  currentIndex = 0;

  /**
   * Initializes the component and maps the skill data.
   */
  ngOnInit(): void {
    this.sections = this.skillFull.skills.map(section => ({
      ...section,
      skills: section.skills.map(skill => ({ ...skill, clicked: false }))
    }));
    this.loading = false;
    this.checkIfMobile();
  }

  /**
   * Listens for window resize events to toggle mobile view.
   */
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkIfMobile();
  }

  /**
   * Checks if the window width is less than or equal to 768px to determine if it's a mobile device.
   */
  checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  /**
   * Moves the carousel to the next section.
   */
  moveToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.sections.length;
  }

  /**
   * Moves the carousel to the previous section.
   */
  moveToPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.sections.length) % this.sections.length;
  }

  /**
   * Handles skill click, toggling the clicked state and showing a popup.
   * @param event - The mouse click event
   * @param skill - The skill that was clicked
   */
  onSkillClick(event: MouseEvent, skill: any): void {
    skill.clicked = !skill.clicked;

    if (skill.clicked) {
      const message = this.createPopupMessage(event.target as HTMLElement);
      setTimeout(() => message.remove(), 5000);
    }
  }

  /**
   * Creates a popup message next to the clicked skill.
   * @param targetElement - The DOM element of the clicked image
   * @returns The created message element
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