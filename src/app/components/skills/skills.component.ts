import { Component, OnInit, HostListener, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { skills as skillsData } from '../../data/skills.data';
import { SkillFull, SkillItem, SkillSection } from '../../dtos/SkillDTO';
import { LanguageCode } from '../../models/language-code.type';
import { TranslationService } from '../../services/translation.service';

type SkillTabId = 'backend' | 'frontend' | 'tooling';

interface SkillTab {
  id: SkillTabId;
  label: string;
}

interface SpotlightPanel extends SkillSection {
  subtitle: string;
  badge: string;
}

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
  tabs: SkillTab[] = [];
  activeTabId: SkillTabId = 'backend';
  spotlightGroups: Record<SkillTabId, SpotlightPanel[]> = {
    backend: [],
    frontend: [],
    tooling: []
  };

  private readonly destroy$ = new Subject<void>();
  private readonly stackOrder: SkillTabId[] = ['backend', 'frontend', 'tooling'];
  private readonly stackKeywords: Record<SkillTabId, string[]> = {
    backend: ['back-end', 'backend', 'servizi', 'services', 'database', 'cloud', 'devops', 'integrazione', 'integration', 'automation', 'automazione'],
    frontend: ['front-end', 'frontend', 'ui', 'linguaggi', 'programming', 'languages'],
    tooling: ['testing', 'documentazione', 'documentation', 'build', 'version', 'collaboration', 'collaborazione', 'management', 'operating', 'sistemi', 'tooling']
  };

  private readonly tabLabelDictionary: Record<SkillTabId, Record<LanguageCode | 'default', string>> = {
    backend: {
      it: 'Stack Back-end',
      en: 'Back-end Stack',
      de: 'Back-end Stack',
      es: 'Stack Back-end',
      default: 'Back-end'
    },
    frontend: {
      it: 'Stack Front-end',
      en: 'Front-end Stack',
      de: 'Front-end Stack',
      es: 'Stack Front-end',
      default: 'Front-end'
    },
    tooling: {
      it: 'Tooling & Ops',
      en: 'Tooling & Ops',
      de: 'Tooling & Ops',
      es: 'Tooling y Ops',
      default: 'Tooling'
    }
  };

  private readonly periodBadgeDictionary: Record<SkillTabId, Record<LanguageCode | 'default', string[]>> = {
    backend: {
      it: ['2014 → oggi', '2016 → oggi', '2018 → oggi', '2020 → oggi'],
      en: ['2014 → now', '2016 → now', '2018 → now', '2020 → now'],
      de: ['2014 → heute', '2016 → heute', '2018 → heute', '2020 → heute'],
      es: ['2014 → hoy', '2016 → hoy', '2018 → hoy', '2020 → hoy'],
      default: ['Ongoing expertise']
    },
    frontend: {
      it: ['2012 → oggi', '2015 → oggi', '2017 → oggi'],
      en: ['2012 → now', '2015 → now', '2017 → now'],
      de: ['2012 → heute', '2015 → heute', '2017 → heute'],
      es: ['2012 → hoy', '2015 → hoy', '2017 → hoy'],
      default: ['Active expertise']
    },
    tooling: {
      it: ['2013 → oggi', '2016 → oggi', '2018 → oggi', '2021 → oggi'],
      en: ['2013 → now', '2016 → now', '2018 → now', '2021 → now'],
      de: ['2013 → heute', '2016 → heute', '2018 → heute', '2021 → heute'],
      es: ['2013 → hoy', '2016 → hoy', '2018 → hoy', '2021 → hoy'],
      default: ['Continuous enablement']
    }
  };

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.buildTabs();
  }

  get activePanels(): SpotlightPanel[] {
    return this.spotlightGroups[this.activeTabId] ?? [];
  }

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
        this.spotlightGroups = this.buildSpotlightGroups(this.timelineSections);
        this.buildTabs();
        this.ensureActiveTab();
        this.currentIndex = 0;
        this.resetCarouselIndex();
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
    this.resetCarouselIndex();
  }

  setActiveTab(tabId: SkillTabId): void {
    if (this.activeTabId === tabId) {
      return;
    }

    this.activeTabId = tabId;
    this.currentIndex = 0;
    this.resetCarouselIndex();
  }

  moveToNext(): void {
    const items = this.activePanels.length ? this.activePanels : this.sections;
    if (!items.length) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % items.length;
  }

  moveToPrevious(): void {
    const items = this.activePanels.length ? this.activePanels : this.sections;
    if (!items.length) {
      return;
    }
    this.currentIndex = (this.currentIndex - 1 + items.length) % items.length;
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

  private resetCarouselIndex(): void {
    const activeLength = this.activePanels.length;
    if (!activeLength) {
      this.currentIndex = 0;
      return;
    }

    this.currentIndex = Math.min(this.currentIndex, activeLength - 1);
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

  private buildSpotlightGroups(sections: Array<SkillSection & { subtitle: string }>): Record<SkillTabId, SpotlightPanel[]> {
    const groups: Record<SkillTabId, SpotlightPanel[]> = {
      backend: [],
      frontend: [],
      tooling: []
    };

    sections.forEach(section => {
      const groupId = this.resolveGroupId(section.title);
      const badge = this.resolveBadge(groupId, groups[groupId].length);
      const panel: SpotlightPanel = {
        ...section,
        subtitle: section.subtitle ?? '',
        badge
      };

      groups[groupId].push(panel);
    });

    return groups;
  }

  private resolveGroupId(title: string): SkillTabId {
    const normalized = this.normalizeTitle(title);

    for (const groupId of this.stackOrder) {
      const keywords = this.stackKeywords[groupId];
      if (keywords.some(keyword => normalized.includes(keyword))) {
        return groupId;
      }
    }

    return 'tooling';
  }

  private normalizeTitle(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private resolveBadge(groupId: SkillTabId, index: number): string {
    const dictionary = this.periodBadgeDictionary[groupId];
    const localized = dictionary[this.currentLanguage] ?? dictionary['default'];
    const safeLocalized = localized.length ? localized : dictionary['default'];
    const resolved = safeLocalized[Math.min(index, safeLocalized.length - 1)];

    if (resolved) {
      return resolved;
    }

    const fallback = dictionary['default'];
    return fallback[Math.min(index, fallback.length - 1)] ?? '';
  }

  private buildTabs(): void {
    this.tabs = this.stackOrder.map(id => ({
      id,
      label: this.resolveTabLabel(id)
    }));
  }

  private resolveTabLabel(id: SkillTabId): string {
    const dictionary = this.tabLabelDictionary[id];
    return dictionary[this.currentLanguage] ?? dictionary['default'];
  }

  private ensureActiveTab(): void {
    if (!this.tabs.length) {
      this.activeTabId = 'backend';
      return;
    }

    const availableTabs = this.tabs.filter(tab => (this.spotlightGroups[tab.id]?.length ?? 0) > 0);
    if (!availableTabs.length) {
      this.activeTabId = this.tabs[0].id;
      return;
    }

    const hasActive = availableTabs.some(tab => tab.id === this.activeTabId);
    if (!hasActive) {
      this.activeTabId = availableTabs[0].id;
    }
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
}
