import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { skills } from '../../data/skills.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss', './skills.carousel.component.scss']
})
export class SkillsComponent implements OnInit {
  skillFull = skills;
  skillFullTitle: string = "";
  sections: any[] = [];
  loading = true;
  isMobile = false;
  currentIndex = 0;
  isBrowser = false;

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.translationService.currentLanguage$.subscribe(lang => {
      this.sections = this.skillFull.skills.map(section => ({
        ...section,
        title: section.title[lang],
        skills: section.skills.map(skill => ({ ...skill, clicked: false }))
      }));
      this.skillFullTitle = this.skillFull.title[lang];
      this.loading = false;
    });

    if (this.isBrowser) {
      this.checkIfMobile();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (this.isBrowser) {
      this.checkIfMobile();
    }
  }

  checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  moveToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.sections.length;
  }

  moveToPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.sections.length) % this.sections.length;
  }

  onSkillClick(event: MouseEvent, skill: any): void {
    if (!this.isBrowser) return;

    skill.clicked = !skill.clicked;

    if (!skill.clicked) {
      return;
    }

    const resolvedTarget = (event.currentTarget ?? event.target);

    if (!(resolvedTarget instanceof HTMLElement)) {
      console.warn('Skill click target is not an HTMLElement.');
      return;
    }

    const message = this.createPopupMessage(resolvedTarget);
    if (message) {
      setTimeout(() => message.remove(), 5000);
    }
  }

  createPopupMessage(targetElement: HTMLElement): HTMLElement | null {
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

    const parent = targetElement.parentElement;

    if (!parent) {
      console.warn('Unable to attach popup message: parent element not found.');
      return null;
    }

    parent.appendChild(message);
    return message;
  }
}
