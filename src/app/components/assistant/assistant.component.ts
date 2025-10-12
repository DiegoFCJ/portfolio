import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, fromEvent, merge, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LanguageCode } from '../../models/language-code.type';
import { TranslationService } from '../../services/translation.service';
import { PLATFORM_ID } from '@angular/core';

export type AssistantAnimationPhase =
  | 'sleeping'
  | 'waking'
  | 'jumping'
  | 'wondering'
  | 'perched'
  | 'falling';

export const ASSISTANT_WAKE_DURATION_MS = 450;
export const ASSISTANT_JUMP_DURATION_MS = 1400;
export const ASSISTANT_WONDERING_DURATION_MS = 2400;
export const ASSISTANT_FALL_DURATION_MS = 980;

interface AssistantGuideVariant {
  readonly intro: string;
  readonly steps: readonly string[];
}

interface AssistantGuideContent {
  readonly title: string;
  readonly closingHint: string;
  readonly desktop: AssistantGuideVariant;
  readonly mobile: AssistantGuideVariant;
}

const assistantGuideContent: Partial<Record<LanguageCode, AssistantGuideContent>> = {
  it: {
    title: 'Guida rapida al portfolio',
    closingHint: 'Quando hai finito, puoi richiudermi: rimango sempre a portata di click.',
    desktop: {
      intro:
        'Se stai usando il portfolio da PC, ecco come sfruttare al meglio ogni controllo.',
      steps: [
        'Apri la barra di navigazione con il pulsante con il chevron verso il basso in basso a destra dello schermo.',
        'Naviga tra le sezioni con le frecce su e giù della navbar; in alternativa puoi scorrere anche con la rotella del mouse.',
        'Passando il mouse sopra i pulsanti compare un suggerimento che descrive la loro azione.',
        'I pulsanti del tema e della lingua aprono sottomenu orizzontali a sinistra per scegliere impostazioni personalizzate.',
        'Nella sezione Numeri chiave ogni card è cliccabile e apre un dialog con dettagli sul calcolo del numero corrispondente.'
      ]
    },
    mobile: {
      intro:
        'Da smartphone il portfolio offre comandi dedicati al tocco: segui questi passaggi rapidi.',
      steps: [
        'Apri la barra di navigazione con il pulsante con il chevron verso il basso in basso a destra dello schermo.',
        'Muoviti tra le sezioni con le frecce su e giù della navbar; se preferisci puoi anche scorrere con le dita.',
        'Tieni premuto un pulsante per mostrare il suggerimento che spiega la sua funzione.',
        'I pulsanti del tema e della lingua aprono sottomenu orizzontali a sinistra per modificare rapidamente le impostazioni.',
        'Nella sezione Stack tecnologico scegli tra back, front e tooling: si apre un carosello che aggiunge le frecce sinistra e destra alla navbar per esplorare le card di competenze.',
        'Nella sezione Numeri chiave ogni card è cliccabile e apre un dialog con dettagli sul calcolo del numero corrispondente.'
      ]
    }
  },
  en: {
    title: 'Quick guide to the portfolio',
    closingHint: 'Close me once you are ready—your guide will stay one click away.',
    desktop: {
      intro:
        "Browsing from a desktop? Here's how to make the most of every control.",
      steps: [
        'Open the navigation bar with the chevron-down button in the lower-right corner.',
        'Move between sections with the navbar up and down arrows; you can also scroll with the mouse wheel if you prefer.',
        'Hover any button to reveal a tooltip that explains what it does.',
        'Theme and language buttons open horizontal submenus on the left so you can adjust your preferences.',
        'In the Key numbers section each card is clickable and opens a dialog with insights on how that number is calculated.'
      ]
    },
    mobile: {
      intro: "On mobile you get touch-friendly controls—follow these quick steps.",
      steps: [
        'Open the navigation bar with the chevron-down button in the lower-right corner.',
        'Use the navbar up and down arrows to switch sections, or swipe with your fingers if you like.',
        'Long-press a button to display a hint describing its action.',
        'Theme and language buttons open horizontal submenus on the left so you can switch settings instantly.',
        'In the Tech stack section choose between back, front and tooling: a carousel appears and adds left and right arrows to the navbar to browse the skill cards.',
        'In the Key numbers section each card is clickable and opens a dialog with insights on how that number is calculated.'
      ]
    }
  }
};

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss']
})
export class AssistantComponent implements OnInit, OnDestroy {
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isOpen = false;
  animationPhase: AssistantAnimationPhase = 'sleeping';

  private wakeTimer: ReturnType<typeof setTimeout> | null = null;
  private jumpTimer: ReturnType<typeof setTimeout> | null = null;
  private fallTimer: ReturnType<typeof setTimeout> | null = null;
  private wonderingTimer: ReturnType<typeof setTimeout> | null = null;
  private landingUpdateTimeout: ReturnType<typeof setTimeout> | null = null;
  private guideScrollEvaluationTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly isMobileSubject = new BehaviorSubject<boolean>(false);
  private isMobile = false;
  private readonly isBrowser: boolean;
  private visualViewportSubscription?: Subscription;

  readonly guideContent$: Observable<AssistantGuideVariant & {
    readonly title: string;
    readonly closingHint: string;
  }>;

  guideScrollState = {
    isScrollable: false,
    isAtEnd: true
  };

  @ViewChild('avatar', { static: true })
  private readonly avatarRef!: ElementRef<HTMLButtonElement>;

  private popupRef?: ElementRef<HTMLDivElement>;
  private guideScrollAreaRef?: ElementRef<HTMLDivElement>;

  @ViewChild('popup')
  set popupElement(value: ElementRef<HTMLDivElement> | undefined) {
    this.popupRef = value;

    if (value) {
      this.requestLandingUpdate();
    } else {
      this.cancelLandingUpdate();
    }
  }

  @ViewChild('guideScrollArea')
  set guideScrollArea(element: ElementRef<HTMLDivElement> | undefined) {
    this.guideScrollAreaRef = element;

    if (element) {
      this.requestGuideScrollEvaluation();
    } else {
      this.cancelGuideScrollEvaluation();
      this.resetGuideScrollState();
    }
  }

  constructor(
    private readonly translationService: TranslationService,
    private readonly hostRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    const content$ = this.translationService
      .getTranslatedData<AssistantGuideContent>(assistantGuideContent, 'it')
      .pipe(map((content) => content ?? assistantGuideContent.it!));

    this.guideContent$ = combineLatest([content$, this.isMobileSubject.asObservable()]).pipe(
      map(([content, isMobile]) => {
        const variant = isMobile ? content.mobile : content.desktop;
        return {
          title: content.title,
          closingHint: content.closingHint,
          intro: variant.intro,
          steps: variant.steps
        };
      }),
      tap(() => this.requestGuideScrollEvaluation())
    );
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.updateMobileState();
      this.registerVisualViewportListeners();
    }
  }

  ngOnDestroy(): void {
    this.cancelLandingUpdate();
    this.cancelGuideScrollEvaluation();
    this.clearAllTimers();
    this.isMobileSubject.complete();
    this.clearMobileViewportMetrics();
    this.visualViewportSubscription?.unsubscribe();
  }

  onAvatarClick(): void {
    if (this.isOpen) {
      this.closeAssistant();
      return;
    }

    if (!this.isOpen && this.animationPhase === 'sleeping') {
      this.openAssistant();
    }
  }

  openAssistant(): void {
    if (this.isOpen || this.animationPhase !== 'sleeping') {
      return;
    }

    this.isOpen = true;
    this.animationPhase = 'waking';
    this.updateMobileViewportMetrics();
    this.requestLandingUpdate();
    this.requestGuideScrollEvaluation();
    this.startWakeSequence();
    this.opened.emit();
  }

  closeAssistant(): void {
    if (!this.isOpen && this.animationPhase === 'sleeping') {
      return;
    }

    this.goToSleep();
  }

  private startWakeSequence(): void {
    this.clearAllTimers();

    this.wakeTimer = setTimeout(() => {
      this.wakeTimer = null;
      this.animationPhase = 'jumping';

      this.jumpTimer = setTimeout(() => {
        this.jumpTimer = null;
        this.startWonderingPhase();
      }, ASSISTANT_JUMP_DURATION_MS);
    }, ASSISTANT_WAKE_DURATION_MS);
  }

  private goToSleep(): void {
    const wasOpen = this.isOpen;

    if (this.animationPhase === 'sleeping' || this.animationPhase === 'falling') {
      return;
    }

    this.startFallSequence(wasOpen);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isOpen) {
      this.requestLandingUpdate();
    }

    if (this.isBrowser) {
      this.updateMobileState();
    }

    this.requestGuideScrollEvaluation();
  }

  private clearAllTimers(): void {
    this.clearWakeTimer();
    this.clearJumpTimer();
    this.clearFallTimer();
    this.clearWonderingTimer();
  }

  private updateMobileState(): void {
    const isMobile = window.innerWidth <= 768;

    this.isMobile = isMobile;
    this.isMobileSubject.next(isMobile);

    if (isMobile) {
      this.updateMobileViewportMetrics();
    } else {
      this.clearMobileViewportMetrics();
    }

    if (!isMobile) {
      this.resetGuideScrollState();
    }

    this.requestGuideScrollEvaluation();
  }

  private clearWakeTimer(): void {
    if (this.wakeTimer) {
      clearTimeout(this.wakeTimer);
      this.wakeTimer = null;
    }
  }

  private clearJumpTimer(): void {
    if (this.jumpTimer) {
      clearTimeout(this.jumpTimer);
      this.jumpTimer = null;
    }
  }

  private clearFallTimer(): void {
    if (this.fallTimer) {
      clearTimeout(this.fallTimer);
      this.fallTimer = null;
    }
  }

  private clearWonderingTimer(): void {
    if (this.wonderingTimer) {
      clearTimeout(this.wonderingTimer);
      this.wonderingTimer = null;
    }
  }

  private requestLandingUpdate(): void {
    if (!this.isBrowser) {
      this.updateLandingCoordinates();
      return;
    }

    if (this.landingUpdateTimeout !== null) {
      clearTimeout(this.landingUpdateTimeout);
    }

    this.landingUpdateTimeout = setTimeout(() => {
      this.landingUpdateTimeout = null;
      this.updateLandingCoordinates();
    }, 16);
  }

  private cancelLandingUpdate(): void {
    if (!this.isBrowser) {
      this.landingUpdateTimeout = null;
      return;
    }

    if (this.landingUpdateTimeout !== null) {
      clearTimeout(this.landingUpdateTimeout);
      this.landingUpdateTimeout = null;
    }
  }

  private updateLandingCoordinates(): void {
    if (!this.isOpen || !this.popupRef) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    const avatarElement = this.avatarRef?.nativeElement;
    const popupElement = this.popupRef.nativeElement;

    if (!avatarElement) {
      return;
    }

    const avatarRect = avatarElement.getBoundingClientRect();
    const popupRect = popupElement.getBoundingClientRect();

    const landingX = popupRect.right - avatarRect.right;
    const landingY = popupRect.top - avatarRect.bottom + 10;

    const hostElement = this.hostRef.nativeElement;
    hostElement.style.setProperty('--assistant-jump-landing-x', `${landingX}px`);
    hostElement.style.setProperty('--assistant-jump-landing-y', `${landingY}px`);
  }

  private resetLandingCoordinates(): void {
    const hostElement = this.hostRef.nativeElement;
    hostElement.style.removeProperty('--assistant-jump-landing-x');
    hostElement.style.removeProperty('--assistant-jump-landing-y');
  }

  private startFallSequence(wasOpen: boolean): void {
    this.clearWakeTimer();
    this.clearJumpTimer();
    this.clearFallTimer();
    this.clearWonderingTimer();

    this.cancelLandingUpdate();
    this.cancelGuideScrollEvaluation();
    this.resetGuideScrollState();

    this.animationPhase = 'falling';
    this.isOpen = false;

    this.fallTimer = setTimeout(() => {
      this.fallTimer = null;
      this.resetLandingCoordinates();
      this.animationPhase = 'sleeping';

      if (wasOpen) {
        this.closed.emit();
      }
    }, ASSISTANT_FALL_DURATION_MS);
  }

  private startWonderingPhase(): void {
    this.clearWonderingTimer();
    this.animationPhase = 'wondering';

    this.wonderingTimer = setTimeout(() => {
      this.wonderingTimer = null;

      if (this.isOpen && this.animationPhase === 'wondering') {
        this.animationPhase = 'perched';
      }
    }, ASSISTANT_WONDERING_DURATION_MS);
  }

  onGuideContentScroll(): void {
    if (!this.guideScrollAreaRef) {
      return;
    }

    const element = this.guideScrollAreaRef.nativeElement;
    const isAtEnd = Math.ceil(element.scrollTop + element.clientHeight) >= element.scrollHeight - 1;

    if (this.guideScrollState.isAtEnd !== isAtEnd) {
      this.guideScrollState = {
        ...this.guideScrollState,
        isAtEnd
      };
    }
  }

  private requestGuideScrollEvaluation(): void {
    if (!this.isBrowser || !this.isOpen || !this.isMobile) {
      return;
    }

    if (this.guideScrollEvaluationTimeout !== null) {
      clearTimeout(this.guideScrollEvaluationTimeout);
    }

    this.guideScrollEvaluationTimeout = setTimeout(() => {
      this.guideScrollEvaluationTimeout = null;
      this.evaluateGuideScrollState();
    }, 16);
  }

  private cancelGuideScrollEvaluation(): void {
    if (this.guideScrollEvaluationTimeout !== null) {
      clearTimeout(this.guideScrollEvaluationTimeout);
      this.guideScrollEvaluationTimeout = null;
    }
  }

  private evaluateGuideScrollState(): void {
    if (!this.guideScrollAreaRef || !this.isMobile) {
      this.resetGuideScrollState();
      return;
    }

    const element = this.guideScrollAreaRef.nativeElement;
    const isScrollable = element.scrollHeight - element.clientHeight > 1;
    const isAtEnd = !isScrollable
      ? true
      : Math.ceil(element.scrollTop + element.clientHeight) >= element.scrollHeight - 1;

    this.guideScrollState = {
      isScrollable,
      isAtEnd
    };
  }

  private resetGuideScrollState(): void {
    this.guideScrollState = {
      isScrollable: false,
      isAtEnd: true
    };
  }

  private registerVisualViewportListeners(): void {
    if (!this.isBrowser || typeof window.visualViewport === 'undefined') {
      return;
    }

    const viewport = window.visualViewport;

    if (!viewport) {
      return;
    }

    const resize$ = fromEvent(viewport, 'resize');
    const scroll$ = fromEvent(viewport, 'scroll');

    this.visualViewportSubscription = merge(resize$, scroll$).subscribe(() => {
      this.updateMobileViewportMetrics();

      if (this.isOpen) {
        this.requestLandingUpdate();
        this.requestGuideScrollEvaluation();
      }
    });
  }

  private updateMobileViewportMetrics(): void {
    if (!this.isBrowser || !this.isMobile) {
      return;
    }

    const viewportHeight = this.getViewportHeight();
    const anchorFootprint = this.getAnchorFootprint();
    const safeAreaBottom = this.getSafeAreaInsetBottom();
    const hostElement = this.hostRef.nativeElement;

    hostElement.style.setProperty('--assistant-mobile-viewport-height', `${viewportHeight}px`);
    hostElement.style.setProperty('--assistant-mobile-anchor-footprint', `${anchorFootprint}px`);
    hostElement.style.setProperty('--assistant-mobile-safe-area-bottom', `${safeAreaBottom}px`);
  }

  private clearMobileViewportMetrics(): void {
    const hostElement = this.hostRef.nativeElement;
    hostElement.style.removeProperty('--assistant-mobile-viewport-height');
    hostElement.style.removeProperty('--assistant-mobile-anchor-footprint');
    hostElement.style.removeProperty('--assistant-mobile-safe-area-bottom');
  }

  private getViewportHeight(): number {
    if (!this.isBrowser) {
      return 0;
    }

    const viewport = window.visualViewport;
    return viewport?.height ?? window.innerHeight;
  }

  private getAnchorFootprint(): number {
    if (!this.isBrowser) {
      return 0;
    }

    const avatarHeight = this.avatarRef?.nativeElement.offsetHeight ?? 0;
    const spacing = this.getAssistantSpacing();

    return avatarHeight + spacing;
  }

  private getAssistantSpacing(): number {
    if (!this.isBrowser) {
      return 0;
    }

    const computed = window.getComputedStyle(this.hostRef.nativeElement);
    const spacingValue = parseFloat(computed.getPropertyValue('--assistant-spacing'));

    return Number.isFinite(spacingValue) ? spacingValue : 0;
  }

  private getSafeAreaInsetBottom(): number {
    if (!this.isBrowser) {
      return 0;
    }

    const rootComputed = window.getComputedStyle(document.documentElement);
    const value = parseFloat(rootComputed.getPropertyValue('--assistant-safe-area-bottom'));

    return Number.isFinite(value) ? value : 0;
  }
}
