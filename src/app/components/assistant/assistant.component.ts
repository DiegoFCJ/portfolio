import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LanguageCode } from '../../models/language-code.type';
import { TranslationService } from '../../services/translation.service';

type AssistantAnimationPhase = 'idle' | 'wondering' | 'suggestClose';

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
  animationPhase: AssistantAnimationPhase = 'idle';

  private wonderingTimer: ReturnType<typeof setTimeout> | null = null;

  readonly guideContent$: Observable<AssistantGuideContent>;

  constructor(private readonly translationService: TranslationService) {
    this.guideContent$ = this.translationService
      .getTranslatedData<AssistantGuideContent>(assistantGuideContent, 'it')
      .pipe(map((content) => content ?? assistantGuideContent.it!));
  }

  ngOnDestroy(): void {
    this.clearWonderingTimer();
  }

  onAvatarClick(): void {
    if (!this.isOpen) {
      this.openAssistant();
    }
  }

  openAssistant(): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    this.animationPhase = 'wondering';
    this.startWonderingTimer();
    this.opened.emit();
  }

  closeAssistant(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;
    this.animationPhase = 'idle';
    this.clearWonderingTimer();
    this.closed.emit();
  }

  private startWonderingTimer(): void {
    this.clearWonderingTimer();
    this.wonderingTimer = setTimeout(() => {
      this.animationPhase = 'suggestClose';
    }, 5000);
  }

  private clearWonderingTimer(): void {
    if (this.wonderingTimer) {
      clearTimeout(this.wonderingTimer);
      this.wonderingTimer = null;
    }
  }
}
