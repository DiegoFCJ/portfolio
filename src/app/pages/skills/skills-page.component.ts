import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { SkillsComponent } from '../../components/skills/skills.component';
import { LanguageCode } from '../../models/language-code.type';
import { TranslationService } from '../../services/translation.service';
import { SectionPageShellComponent } from '../shared/section-page-shell/section-page-shell.component';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [CommonModule, SectionPageShellComponent, SkillsComponent, MatIconModule],
  templateUrl: './skills-page.component.html',
  styleUrls: ['./skills-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsPageComponent implements AfterViewInit {
  private readonly stackCarouselLabels: Record<'prev' | 'next', Partial<Record<LanguageCode, string>>> = {
    prev: {
      it: 'Stack precedente',
      en: 'Previous stack',
      de: 'Vorheriger Stack',
      es: 'Stack anterior',
      no: 'Forrige stack',
      ru: 'Предыдущий стек',
    },
    next: {
      it: 'Stack successivo',
      en: 'Next stack',
      de: 'Nächster Stack',
      es: 'Stack siguiente',
      no: 'Neste stack',
      ru: 'Следующий стек',
    },
  };

  readonly stackCarouselPreviousLabel$: Observable<string>;
  readonly stackCarouselNextLabel$: Observable<string>;

  @ViewChild(SkillsComponent) skillsComponent?: SkillsComponent;

  private readonly isBrowser: boolean;
  private isMobileViewport = false;

  constructor(
    private readonly translationService: TranslationService,
    private readonly cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.stackCarouselPreviousLabel$ = this.translationService.getTranslatedData(
      this.stackCarouselLabels.prev,
      'it',
    );
    this.stackCarouselNextLabel$ = this.translationService.getTranslatedData(
      this.stackCarouselLabels.next,
      'it',
    );
  }

  ngAfterViewInit(): void {
    this.updateViewportMode();
    this.cdr.detectChanges();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateViewportMode();
  }

  get showStackCarouselControls(): boolean {
    return this.isMobileViewport && !!this.skillsComponent;
  }

  onStackCarouselPrevious(): void {
    this.skillsComponent?.moveToPrevious();
  }

  onStackCarouselNext(): void {
    this.skillsComponent?.moveToNext();
  }

  private updateViewportMode(): void {
    if (!this.isBrowser) {
      if (this.isMobileViewport) {
        this.isMobileViewport = false;
        this.cdr.markForCheck();
      }
      return;
    }

    const previous = this.isMobileViewport;
    this.isMobileViewport = window.innerWidth <= 768;

    if (previous !== this.isMobileViewport) {
      this.cdr.markForCheck();
    }
  }
}
