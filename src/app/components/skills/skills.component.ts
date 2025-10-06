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
type SkillTabId = 'backend' | 'frontend' | 'tooling';

interface SpotlightSection extends SkillSection {
  category: SkillTabId;
  period: string;
  originalIndex: number;
}

interface SkillTab {
  id: SkillTabId;
  label: string;
  sections: SpotlightSection[];
}

interface TabBlueprint {
  id: SkillTabId;
  label: string;
  indices: number[];
}

export class SkillsComponent implements OnInit, OnDestroy {
  skillFullTitle = '';
  sections: SpotlightSection[] = [];
  tabs: SkillTab[] = [];
  activeTabId: SkillTabId | null = null;
  activeSections: SpotlightSection[] = [];
  isLoading = true;
  isMobile = false;
  currentIndex = 0;
  isBrowser = false;

  private readonly destroy$ = new Subject<void>();
  private readonly tabBlueprint: TabBlueprint[] = [
    { id: 'backend', label: 'Back-end', indices: [2, 3, 4, 5] },
    { id: 'frontend', label: 'Front-end', indices: [0, 1] },
    { id: 'tooling', label: 'Tooling', indices: [6, 7, 8, 9, 10] }
  ];

  private readonly sectionPeriodMap: Record<number, string> = {
    0: 'Dal 2013',
    1: 'Dal 2015',
    2: 'Dal 2014',
    3: 'Dal 2012',
    4: 'Dal 2016',
    5: 'Dal 2018',
    6: 'Dal 2017',
    7: 'Dal 2011',
    8: 'Dal 2010',
    9: 'Dal 2019',
    10: 'Dal 2009'
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
        const previousTabId = this.activeTabId;
        this.sections = translated.skills.map((section, index) => this.decorateSection(section, index));
        this.tabs = this.buildTabs(this.sections);

        const preferredTab = previousTabId
          ? this.tabs.find(tab => tab.id === previousTabId && tab.sections.length)
          : null;
        const fallbackTab = this.tabs.find(tab => tab.sections.length) ?? null;

        const resolvedTab = preferredTab ?? fallbackTab;

        this.activeTabId = resolvedTab?.id ?? null;
        this.activeSections = resolvedTab?.sections ?? [];
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
    if (!this.activeSections.length) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % this.activeSections.length;
  }

  moveToPrevious(): void {
    if (!this.activeSections.length) {
      return;
    }
    this.currentIndex = (this.currentIndex - 1 + this.activeSections.length) % this.activeSections.length;
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

  setActiveTab(tabId: SkillTabId): void {
    if (this.activeTabId === tabId) {
      return;
    }

    const tab = this.tabs.find(item => item.id === tabId);
    if (!tab) {
      return;
    }

    this.activeTabId = tabId;
    this.activeSections = tab.sections;
    this.currentIndex = 0;
  }

  trackBySection(_index: number, section: SpotlightSection): number {
    return section.originalIndex;
  }

  private decorateSection(section: SkillSection, index: number): SpotlightSection {
    const category = this.resolveCategory(index);

    return {
      ...section,
      skills: section.skills.map(skill => ({ ...skill, clicked: false })),
      category,
      period: this.sectionPeriodMap[index] ?? 'Continuo',
      originalIndex: index
    };
  }

  private buildTabs(sections: SpotlightSection[]): SkillTab[] {
    return this.tabBlueprint.map(blueprint => ({
      id: blueprint.id,
      label: blueprint.label,
      sections: blueprint.indices
        .map(index => sections.find(section => section.originalIndex === index))
        .filter((section): section is SpotlightSection => Boolean(section))
    }));
  }

  private resolveCategory(index: number): SkillTabId {
    const blueprint = this.tabBlueprint.find(tab => tab.indices.includes(index));
    return blueprint?.id ?? 'tooling';
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
