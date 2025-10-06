import { Component, OnInit, HostListener, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { skills as skillsData } from '../../data/skills.data';
import { SkillFull, SkillItem, SkillSection } from '../../dtos/SkillDTO';
import { LanguageCode } from '../../models/language-code.type';
import { TranslationService } from '../../services/translation.service';

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
  timelineSections: Array<SkillSection & { subtitle: string }> = [];
  isLoading = true;
  isMobile = false;
  currentIndex = 0;
  isBrowser = false;
  currentLanguage: LanguageCode = 'it';

  private readonly destroy$ = new Subject<void>();
  private readonly timelineSubtitleDictionary: Record<string, Record<string, string>> = {
    it: {
      'Linguaggi di Programmazione': 'Fondamenta del linguaggio',
      'Front-end e UI': 'Interfacce dinamiche',
      'Back-end e Servizi': 'Servizi applicativi',
      'Database': 'Gestione dei dati',
      'Cloud e DevOps': 'DevOps e scalabilità',
      'Integrazione e Automazione': 'Integrazione enterprise',
      'Testing e Documentazione': 'Qualità e API',
      'Build e CI': 'Pipeline di delivery',
      'Version Control': 'Versionamento continuo',
      'Collaborazione e Management': 'Collaborazione quotidiana',
      'Sistemi Operativi': 'Ambiente operativo'
    },
    en: {
      'Programming Languages': 'Foundational languages',
      'Front-end & UI': 'User interface craftsmanship',
      'Back-end & Services': 'Service layer tooling',
      'Database': 'Data foundations',
      'Cloud & DevOps': 'Platform & scalability',
      'Integration & Automation': 'Enterprise integration',
      'Testing & Documentation': 'Quality assurance',
      'Build & CI': 'Delivery pipeline',
      'Version Control': 'Source control',
      'Collaboration & Management': 'Team collaboration',
      'Operating Systems': 'Runtime environments'
    },
    default: {}
  };

  private readonly timelineStageFallbacks: Record<string, string[]> = {
    it: [
      'Fondamenta del linguaggio',
      'Interfacce dinamiche',
      'Servizi applicativi',
      'Gestione dei dati',
      'DevOps e scalabilità',
      'Integrazione enterprise',
      'Qualità e API',
      'Pipeline di delivery',
      'Versionamento continuo',
      'Collaborazione quotidiana',
      'Ambiente operativo'
    ],
    en: [
      'Foundational languages',
      'User interface craftsmanship',
      'Service layer tooling',
      'Data foundations',
      'Platform & scalability',
      'Enterprise integration',
      'Quality assurance',
      'Delivery pipeline',
      'Source control',
      'Team collaboration',
      'Runtime environments'
    ],
    default: [
      'Core foundations',
      'Interface experiences',
      'Application services',
      'Data foundations',
      'Platform & scalability',
      'Enterprise integration',
      'Quality assurance',
      'Delivery pipeline',
      'Source control',
      'Team collaboration',
      'Runtime environments'
    ]
  };

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
        switchMap((lang) => {
          this.currentLanguage = lang;
          const source = this.resolveLocalizedContent(skillsData);
          return this.translationService.translateContent<SkillFull>(
            source.content,
            source.language,
            lang
          );
        })
      )
      .subscribe(translated => {
        this.skillFullTitle = translated.title;
        this.sections = translated.skills.map(section => this.resetSection(section));
        this.timelineSections = this.buildTimelineSections(this.sections);
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

    const resolvedTarget = (event.currentTarget ?? event.target) as EventTarget | null;

    if (!(resolvedTarget instanceof Element)) {
      console.warn('Skill click target is not an HTMLElement.');
      return;
    }

    const message = this.createPopupMessage(resolvedTarget);
    if (message) {
      setTimeout(() => message.remove(), 5000);
    }
  }

  createPopupMessage(targetElement: Element): HTMLElement | null {
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

    const host = this.resolvePopupHost(targetElement);

    if (!host) {
      console.warn('Unable to attach popup message: host element not found.');
      return null;
    }

    if (host instanceof HTMLElement && getComputedStyle(host).position === 'static') {
      host.style.position = 'relative';
    }

    host.appendChild(message);
    return message;
  }

  private resolvePopupHost(targetElement: Element): Element | null {
    const timelineHost = targetElement.closest('.skill-chip, .skill-item, [data-skill-host]');
    if (timelineHost) {
      return timelineHost;
    }

    if (targetElement.parentElement) {
      return targetElement.parentElement;
    }

    return targetElement instanceof HTMLElement ? targetElement : null;
  }

  private resetSection(section: SkillSection): SkillSection {
    return {
      ...section,
      skills: section.skills.map(skill => ({ ...skill, clicked: false }))
    };
  }

  private buildTimelineSections(sections: SkillSection[]): Array<SkillSection & { subtitle: string }> {
    const stageFallbacks = this.timelineStageFallbacks[this.currentLanguage] ?? this.timelineStageFallbacks['default'];

    return sections.map((section, index) => {
      const subtitleDictionary = this.timelineSubtitleDictionary[this.currentLanguage] ?? this.timelineSubtitleDictionary['default'];
      const subtitle = section.subtitle
        ?? subtitleDictionary?.[section.title]
        ?? this.timelineSubtitleDictionary['default']?.[section.title]
        ?? stageFallbacks[index]
        ?? stageFallbacks[stageFallbacks.length - 1]
        ?? '';

      return {
        ...section,
        subtitle
      };
    });
  }

  private resolveLocalizedContent<T>(
    data: Partial<Record<LanguageCode, T>>
  ): { content: T; language: LanguageCode } {
    const preferred: LanguageCode = 'it';
    const preferredContent = data[preferred];
    if (preferredContent) {
      return { content: preferredContent, language: preferred };
    }

    const fallbackOrder: LanguageCode[] = ['en', 'de', 'es'];
    for (const fallback of fallbackOrder) {
      const content = data[fallback];
      if (content) {
        return { content, language: fallback };
      }
    }

    const firstEntry = Object.entries(data)[0];
    if (firstEntry) {
      return { content: firstEntry[1] as T, language: firstEntry[0] as LanguageCode };
    }

    throw new Error('No skill data available');
  }
}
