import { Component, OnInit, HostListener, Inject, PLATFORM_ID, OnDestroy, Input, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject, forkJoin } from 'rxjs';
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

type SkillsDisplayVariant = 'home' | 'page';

interface CarouselLabels {
  previous: string;
  next: string;
  backToTabs: string;
  progress: string;
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
  stackSelectorLabel = 'Skill stack selector';
  tabs: SkillTab[] = [];
  activeTabId: SkillTabId = 'backend';
  spotlightGroups: Record<SkillTabId, SpotlightPanel[]> = {
    backend: [],
    frontend: [],
    tooling: [],
    devops: []
  };
  private _variant: SkillsDisplayVariant = 'page';

  @Input()
  set variant(value: SkillsDisplayVariant | null | undefined) {
    this._variant = value === 'home' ? 'home' : 'page';
  }

  get variant(): SkillsDisplayVariant {
    return this._variant;
  }

  @HostBinding('class.skills--home')
  get hostClassHome(): boolean {
    return this.variant === 'home';
  }

  @HostBinding('class.skills--page')
  get hostClassPage(): boolean {
    return this.variant === 'page';
  }

  private readonly destroy$ = new Subject<void>();
  private readonly stackOrder: SkillTabId[] = ['backend', 'frontend', 'tooling', 'devops'];
  private readonly stackKeywords: Record<SkillTabId, string[]> = {
    backend: ['back-end', 'backend', 'database', 'integrazione', 'integration', 'automation', 'automazione', 'autenticazione', 'authentication', 'api'],
    frontend: ['front-end', 'frontend', 'ui', 'linguaggi', 'programming', 'languages'],
    tooling: ['planning', 'pianificazione', 'productivity', 'produttivita', 'design', 'tooling', 'office'],
    devops: ['devops', 'container', 'containerizzazione', 'orchestrazione', 'ci/cd', 'cicd', 'platform', 'scripting', 'configuration', 'configurazione', 'script', 'versioning', 'operating systems', 'sistemi operativi']
  };
  private readonly skillResetTimers = new WeakMap<SkillItem, number>();
  private readonly stackSelectorLabelSource: { text: string; language: LanguageCode } = {
    text: 'Skill stack selector',
    language: 'en'
  };

  @ViewChild('stackTabs')
  private stackTabs?: ElementRef<HTMLElement>;

  private readonly tabLabelDictionary: Record<SkillTabId, Record<LanguageCode | 'default', string>> = {
    // TODO(content): Provide bespoke tab labels for Norwegian and Russian if desired.
    backend: {
      it: 'Back-end',
      en: 'Back-end',
      de: 'Back-end',
      es: 'Back-end',
      no: 'Back-end',
      ru: 'Back-end',
      default: 'Back-end'
    },
    frontend: {
      it: 'Front-end',
      en: 'Front-end',
      de: 'Front-end',
      es: 'Front-end',
      no: 'Front-end',
      ru: 'Front-end',
      default: 'Front-end'
    },
    tooling: {
      it: 'Tooling',
      en: 'Tooling',
      de: 'Tooling',
      es: 'Tooling',
      no: 'Tooling',
      ru: 'Tooling',
      default: 'Tooling'
    },
    devops: {
      it: 'DevOps',
      en: 'DevOps',
      de: 'DevOps',
      es: 'DevOps',
      no: 'DevOps',
      ru: 'DevOps',
      default: 'DevOps'
    }
  };

  private readonly carouselLabelDictionary: Record<LanguageCode | 'default', CarouselLabels> = {
    it: {
      previous: 'Mostra la sezione precedente dello stack',
      next: 'Mostra la sezione successiva dello stack',
      backToTabs: 'Torna alla selezione dello stack',
      progress: 'Sezione {current} di {total}'
    },
    en: {
      previous: 'Show previous stack section',
      next: 'Show next stack section',
      backToTabs: 'Back to stack selection',
      progress: 'Section {current} of {total}'
    },
    de: {
      previous: 'Vorherigen Stack-Bereich anzeigen',
      next: 'Nächsten Stack-Bereich anzeigen',
      backToTabs: 'Zur Stack-Auswahl zurückkehren',
      progress: 'Abschnitt {current} von {total}'
    },
    es: {
      previous: 'Mostrar la sección anterior del stack',
      next: 'Mostrar la siguiente sección del stack',
      backToTabs: 'Volver a la selección del stack',
      progress: 'Sección {current} de {total}'
    },
    no: {
      previous: 'Vis forrige stack-seksjon',
      next: 'Vis neste stack-seksjon',
      backToTabs: 'Tilbake til stack-valget',
      progress: 'Seksjon {current} av {total}'
    },
    ru: {
      previous: 'Показать предыдущий раздел стека',
      next: 'Показать следующий раздел стека',
      backToTabs: 'Вернуться к выбору стека',
      progress: 'Раздел {current} из {total}'
    },
    default: {
      previous: 'Show previous stack section',
      next: 'Show next stack section',
      backToTabs: 'Back to stack selection',
      progress: 'Section {current} of {total}'
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
          const translatedContent$ = this.translationService.translateContent<SkillFull>(
            source.content,
            source.language,
            lang
          );
          const translatedLabel$ = this.translationService.translateText(
            this.stackSelectorLabelSource.text,
            this.stackSelectorLabelSource.language,
            lang
          );

          return forkJoin({
            content: translatedContent$,
            label: translatedLabel$
          });
        })
      )
      .subscribe(({ content, label }) => {
        this.skillFullTitle = content.title;
        this.sections = content.skills.map(section => this.resetSection(section));
        this.timelineSections = this.buildTimelineSections(this.sections);
        this.spotlightGroups = this.buildSpotlightGroups(this.timelineSections);
        this.buildTabs();
        this.ensureActiveTab();
        this.currentIndex = 0;
        this.resetCarouselIndex();
        this.stackSelectorLabel = label?.trim() ? label : this.stackSelectorLabelSource.text;
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

  getCarouselControlLabel(type: 'previous' | 'next' | 'backToTabs'): string {
    const labels = this.getCarouselLabels();

    switch (type) {
      case 'previous':
        return labels.previous;
      case 'next':
        return labels.next;
      case 'backToTabs':
        return labels.backToTabs;
      default:
        return labels.previous;
    }
  }

  getCarouselProgressLabel(): string {
    const labels = this.getCarouselLabels();
    const current = (this.currentIndex + 1).toString();
    const total = this.activePanels.length.toString();

    return labels.progress
      .replace('{current}', current)
      .replace('{total}', total);
  }

  scrollToTabs(): void {
    if (!this.isBrowser) {
      return;
    }

    const target = this.stackTabs?.nativeElement;
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  private getCarouselLabels(): CarouselLabels {
    return this.carouselLabelDictionary[this.currentLanguage] ?? this.carouselLabelDictionary['default'];
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

    const fallbackOrder: LanguageCode[] = ['en', 'de', 'es', 'no', 'ru'];
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
    no: {
      'Linguaggi di Programmazione': 'Språkfundament',
      'Front-end e UI': 'Dynamiske grensesnitt',
      'Back-end e Servizi': 'Applikasjonstjenester',
      'Database': 'Datahåndtering',
      'Cloud e DevOps': 'DevOps og skalerbarhet',
      'Integrazione e Automazione': 'Enterprise-integrasjon',
      'Testing e Documentazione': 'Kvalitet og API-er',
      'Build e CI': 'Leveringspipeline',
      'Version Control': 'Versjonskontroll',
      'Collaborazione e Management': 'Daglig samarbeid',
      'Sistemi Operativi': 'Kjøremiljøer',
      'Programming Languages': 'Språkfundament',
      'Front-end & UI': 'Dynamiske grensesnitt',
      'Back-end & Services': 'Applikasjonstjenester',
      'Cloud & DevOps': 'DevOps og skalerbarhet',
      'Integration & Automation': 'Enterprise-integrasjon',
      'Testing & Documentation': 'Kvalitet og API-er',
      'Build & CI': 'Leveringspipeline',
      'Collaboration & Management': 'Daglig samarbeid',
      'Operating Systems': 'Kjøremiljøer'
    },
    ru: {
      'Linguaggi di Programmazione': 'Основы языков',
      'Front-end e UI': 'Динамичные интерфейсы',
      'Back-end e Servizi': 'Прикладные сервисы',
      'Database': 'Управление данными',
      'Cloud e DevOps': 'DevOps и масштабирование',
      'Integrazione e Automazione': 'Корпоративная интеграция',
      'Testing e Documentazione': 'Качество и API',
      'Build e CI': 'Конвейер поставки',
      'Version Control': 'Контроль версий',
      'Collaborazione e Management': 'Ежедневное сотрудничество',
      'Sistemi Operativi': 'Рабочие среды',
      'Programming Languages': 'Основы языков',
      'Front-end & UI': 'Динамичные интерфейсы',
      'Back-end & Services': 'Прикладные сервисы',
      'Cloud & DevOps': 'DevOps и масштабирование',
      'Integration & Automation': 'Корпоративная интеграция',
      'Testing & Documentation': 'Качество и API',
      'Build & CI': 'Конвейер поставки',
      'Collaboration & Management': 'Ежедневное сотрудничество',
      'Operating Systems': 'Рабочие среды'
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
    no: [
      'Språkfundament',
      'Dynamiske grensesnitt',
      'Applikasjonstjenester',
      'Datahåndtering',
      'DevOps og skalerbarhet',
      'Enterprise-integrasjon',
      'Kvalitet og API-er',
      'Leveringspipeline',
      'Versjonskontroll',
      'Daglig samarbeid',
      'Kjøremiljøer'
    ],
    ru: [
      'Основы языков',
      'Динамичные интерфейсы',
      'Прикладные сервисы',
      'Управление данными',
      'DevOps и масштабирование',
      'Корпоративная интеграция',
      'Качество и API',
      'Конвейер поставки',
      'Контроль версий',
      'Ежедневное сотрудничество',
      'Рабочие среды'
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
