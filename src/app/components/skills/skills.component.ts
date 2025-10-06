import { Component, OnInit, HostListener, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { skills as skillsData } from '../../data/skills.data';
import { SkillFull, SkillItem, SkillLangs, SkillSection } from '../../dtos/SkillDTO';
import { LanguageCode, TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss', './skills.carousel.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {
  skillFullTitle = '';
  sections: SkillSection[] = [];
  isLoading = true;
  isMobile = false;
  currentIndex = 0;
  isBrowser = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.translationService.currentLanguage$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap((lang) => this.getSkillsByLanguage(lang))
      )
      .subscribe(translated => {
        this.skillFullTitle = translated.title;
        this.sections = translated.skills.map(section => this.resetSection(section));
        this.currentIndex = 0;
        this.isLoading = false;
      });

    if (this.isBrowser) {
      this.checkIfMobile();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    if (!this.sections.length) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % this.sections.length;
  }

  moveToPrevious(): void {
    if (!this.sections.length) {
      return;
    }
    this.currentIndex = (this.currentIndex - 1 + this.sections.length) % this.sections.length;
  }

  onSkillClick(event: MouseEvent, skill: SkillItem): void {
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

  private getSkillsByLanguage(lang: LanguageCode): Observable<SkillFull> {
    const data: SkillLangs = skillsData;
    const base = data.en;

    if (lang === 'en') {
      return of(base);
    }

    const existing = data[lang];
    if (existing) {
      return of(existing);
    }

    return this.translationService.translateContent<SkillFull>(base, 'en', lang);
  }

  private resetSection(section: SkillSection): SkillSection {
    return {
      ...section,
      skills: section.skills.map(skill => ({ ...skill, clicked: false }))
    };
  }
}
