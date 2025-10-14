import { Component, OnInit, HostListener, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { skills as skillsData } from '../../data/skills.data';
import { SkillFull, SkillItem, SkillSection } from '../../dtos/SkillDTO';
import { LanguageCode } from '../../models/language-code.type';
import { TranslationService } from '../../services/translation.service';

type SkillTabId = 'backend' | 'frontend' | 'tooling' | 'devops';

interface SkillTab {
  id: SkillTabId;
  label: string;
}

interface SpotlightPanel extends SkillSection {
  subtitle: string;
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
    tooling: [],
    devops: []
  };

  private readonly destroy$ = new Subject<void>();
  private readonly stackOrder: SkillTabId[] = ['backend', 'frontend', 'tooling', 'devops'];
  private readonly stackKeywords: Record<SkillTabId, string[]> = {
    backend: ['back-end', 'backend', 'database', 'integrazione', 'integration', 'automation', 'automazione', 'autenticazione', 'authentication', 'api'],
    frontend: ['front-end', 'frontend', 'ui', 'linguaggi', 'programming', 'languages'],
    tooling: ['planning', 'pianificazione', 'productivity', 'produttivita', 'design', 'tooling', 'office'],
    devops: ['devops', 'container', 'containerizzazione', 'orchestrazione', 'ci/cd', 'cicd', 'platform', 'scripting', 'configuration', 'configurazione', 'script', 'versioning', 'operating systems', 'sistemi operativi']
  };
  private readonly skillResetTimers = new WeakMap<SkillItem, number>();

  private readonly tabLabelDictionary: Record<SkillTabId, Record<LanguageCode | 'default', string>> = {
    backend: {
      it: 'Back-end',
      en: 'Back-end',
      de: 'Back-end',
      es: 'Back-end',
      default: 'Back-end'
    },
    frontend: {
      it: 'Front-end',
      en: 'Front-end',
      de: 'Front-end',
      es: 'Front-end',
      default: 'Front-end'
    },
    tooling: {
      it: 'Tooling',
      en: 'Tooling',
      de: 'Tooling',
      es: 'Tooling',
      default: 'Tooling'
    },
    devops: {
      it: 'DevOps',
      en: 'DevOps',
      de: 'DevOps',
      es: 'DevOps',
      default: 'DevOps'
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
    const items = this.getCarouselItems();
    if (!items.length) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % items.length;
  }

  moveToPrevious(): void {
    const items = this.getCarouselItems();
    if (!items.length) {
      return;
    }
    this.currentIndex = (this.currentIndex - 1 + items.length) % items.length;
  }

  onSkillClick(skill: SkillItem): void {
    if (!this.isBrowser) {
      return;
    }

    const timer = this.skillResetTimers.get(skill);
    if (timer !== undefined) {
      clearTimeout(timer);
      this.skillResetTimers.delete(skill);
    }

    skill.clicked = false;

    window.requestAnimationFrame(() => {
      skill.clicked = true;

      const resetTimer = window.setTimeout(() => {
        skill.clicked = false;
        this.skillResetTimers.delete(skill);
      }, 750);

      this.skillResetTimers.set(skill, resetTimer);
    });
  }

  private resetCarouselIndex(): void {
    const items = this.getCarouselItems();
    const length = items.length;
    if (!length) {
      this.currentIndex = 0;
      return;
    }

    this.currentIndex = Math.min(this.currentIndex, length - 1);
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
      tooling: [],
      devops: []
    };

    sections.forEach(section => {
      const groupId = this.resolveGroupId(section.title);
      const panel: SpotlightPanel = {
        ...section,
        subtitle: section.subtitle ?? ''
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

  private getCarouselItems(): Array<SpotlightPanel | SkillSection> {
    if (this.isMobile && this.activePanels.length) {
      return this.activePanels;
    }

    return this.sections;
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

    const fallbackCandidates = Array.from(
      new Set<LanguageCode>([
        ...(['en'] as LanguageCode[]),
        ...(Object.keys(data) as LanguageCode[]),
      ])
    );

    for (const candidate of fallbackCandidates) {
      if (candidate === preferred) {
        continue;
      }

      const content = data[candidate];
      if (content) {
        return { content, language: candidate };
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
