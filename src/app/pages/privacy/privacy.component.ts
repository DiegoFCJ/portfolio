import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrivacyContent, PRIVACY_CONTENT } from '../../data/privacy.data';
import { TranslationService } from '../../services/translation.service';
import { SectionPageShellComponent } from '../shared/section-page-shell.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, SectionPageShellComponent],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {
  readonly content$: Observable<PrivacyContent>;
  readonly previousRoute = '/contact';
  readonly nextRoute?: string = undefined;
  private readonly isBrowser: boolean;

  constructor(
    private readonly translationService: TranslationService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.content$ = this.translationService
      .getTranslatedData<PrivacyContent>(PRIVACY_CONTENT, 'it')
      .pipe(map((content) => content ?? PRIVACY_CONTENT.it!));
  }

  onNavigateTo(sectionId: string, event: Event): void {
    event.preventDefault();

    if (!this.isBrowser) {
      return;
    }

    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
      inline: 'nearest',
    });

    const isPointerInteraction =
      event instanceof MouseEvent ||
      (typeof PointerEvent !== 'undefined' && event instanceof PointerEvent) ||
      (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent);

    if (isPointerInteraction) {
      (event.currentTarget as HTMLElement | null)?.blur();
    }
  }
}
