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
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
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
  private landingUpdateFrame: number | null = null;
  private readonly isMobileSubject = new BehaviorSubject<boolean>(false);
  private readonly isBrowser: boolean;

  readonly guideContent$: Observable<AssistantGuideVariant & {
    readonly title: string;
    readonly closingHint: string;
  }>;

  @ViewChild('avatar', { static: true })
  private readonly avatarRef!: ElementRef<HTMLButtonElement>;

  private popupRef?: ElementRef<HTMLDivElement>;

  @ViewChild('popup')
  set popupElement(value: ElementRef<HTMLDivElement> | undefined) {
    this.popupRef = value;

    if (value) {
      this.requestLandingUpdate();
    } else {
      this.cancelLandingUpdate();
    }
  }

  constructor(
    private readonly translationService: TranslationService,
    private readonly hostRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: Object
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
      })
    );
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.updateMobileState();
    }
  }

  ngOnDestroy(): void {
    this.cancelLandingUpdate();
    this.clearAllTimers();
    this.isMobileSubject.complete();
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
    this.requestLandingUpdate();
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
  }

  private clearAllTimers(): void {
    this.clearWakeTimer();
    this.clearJumpTimer();
    this.clearFallTimer();
    this.clearWonderingTimer();
  }

  private updateMobileState(): void {
    this.isMobileSubject.next(window.innerWidth <= 768);
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
    if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') {
      this.updateLandingCoordinates();
      return;
    }

    if (this.landingUpdateFrame !== null) {
      window.cancelAnimationFrame(this.landingUpdateFrame);
    }

    this.landingUpdateFrame = window.requestAnimationFrame(() => {
      this.landingUpdateFrame = null;
      this.updateLandingCoordinates();
    });
  }

  private cancelLandingUpdate(): void {
    if (typeof window === 'undefined' || typeof window.cancelAnimationFrame !== 'function') {
      this.landingUpdateFrame = null;
      return;
    }

    if (this.landingUpdateFrame !== null) {
      window.cancelAnimationFrame(this.landingUpdateFrame);
      this.landingUpdateFrame = null;
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
}
