import { Component, OnDestroy, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { skills } from '../../data/skills.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss', './skills.carousel.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {
  skillFull = skills;
  skillFullTitle: string = "";
  sections: any[] = [];
  loading = true;
  isMobile = false;
  currentIndex = 0;
  isBrowser = false;
  private destroy$ = new Subject<void>();

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.translationService.currentLanguage$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.loading = true),
        switchMap(language => this.translationService.translateContent(this.skillFull, 'en', language))
      )
      .subscribe(translated => {
        this.sections = translated.skills.map(section => ({
          ...section,
          title: section.title.en,
          skills: section.skills.map(skill => ({ ...skill, clicked: false }))
        }));
        this.skillFullTitle = translated.title.en;
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
    if (this.loading || !this.sections.length) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % this.sections.length;
  }

  moveToPrevious(): void {
    if (this.loading || !this.sections.length) {
      return;
    }
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
