import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LanguageCode } from '../../models/language-code.type';
import { TranslationService } from '../../services/translation.service';

export type AssistantAnimationPhase =
  | 'sleeping'
  | 'waking'
  | 'jumping'
  | 'wondering'
  | 'perched'
  | 'falling';

export const ASSISTANT_WAKE_DURATION_MS = 450;
export const ASSISTANT_JUMP_DURATION_MS = 1400;
export const ASSISTANT_WONDERING_DURATION_MS = 5000;
export const ASSISTANT_FALL_DURATION_MS = 980;

interface AssistantGuideContent {
  readonly title: string;
  readonly intro: string;
  readonly steps: readonly string[];
  readonly closingHint: string;
}

const assistantGuideContent: Partial<Record<LanguageCode, AssistantGuideContent>> = {
  it: {
    title: 'Guida rapida al portfolio',
    intro:
      'Sono qui per aiutarti a esplorare il portfolio: segui questi passaggi per non perderti nulla.',
    steps: [
      'Usa le frecce del navigatore per spostarti rapidamente tra le sezioni.',
      'Nel navigatore puoi cambiare tema e lingua in qualsiasi momento.',
      'Scorri con calma ogni sezione: troverai progetti, esperienze e contatti utili.'
    ],
    closingHint: 'Quando hai finito, puoi richiudermi: rimango sempre a portata di click.'
  },
  en: {
    title: 'Quick guide to the portfolio',
    intro:
      "I'm here to guide you through the portfolio—follow these tips to discover every highlight.",
    steps: [
      'Use the navigator arrows to jump between sections without losing your place.',
      'Switch theme and language from the navigator whenever you like.',
      'Take your time in each section to explore projects, experience and contact details.'
    ],
    closingHint: 'Close me once you are ready—your guide will stay one click away.'
  }
};

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss']
})
export class AssistantComponent implements OnDestroy {
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isOpen = false;
  animationPhase: AssistantAnimationPhase = 'sleeping';

  private wakeTimer: ReturnType<typeof setTimeout> | null = null;
  private jumpTimer: ReturnType<typeof setTimeout> | null = null;
  private fallTimer: ReturnType<typeof setTimeout> | null = null;
  private wonderingTimer: ReturnType<typeof setTimeout> | null = null;
  private landingUpdateFrame: number | null = null;

  readonly guideContent$: Observable<AssistantGuideContent>;

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
    private readonly hostRef: ElementRef<HTMLElement>
  ) {
    this.guideContent$ = this.translationService
      .getTranslatedData<AssistantGuideContent>(assistantGuideContent, 'it')
      .pipe(map((content) => content ?? assistantGuideContent.it!));
  }

  ngOnDestroy(): void {
    this.cancelLandingUpdate();
    this.clearAllTimers();
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
  }

  private clearAllTimers(): void {
    this.clearWakeTimer();
    this.clearJumpTimer();
    this.clearFallTimer();
    this.clearWonderingTimer();
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
