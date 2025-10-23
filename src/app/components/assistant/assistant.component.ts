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
import { RouterLink } from '@angular/router';

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
  readonly privacyLink: {
    readonly label: string;
    readonly description: string;
  };
}

const assistantGuideContent: Partial<Record<LanguageCode, AssistantGuideContent>> = {
  de: {
    title: 'Schnellguide zum Portfolio',
    closingHint:
      'Wenn du fertig bist, kannst du mich schließen – die Anleitung bleibt immer nur einen Klick entfernt.',
    privacyLink: {
      label: 'Datenschutzhinweise lesen',
      description:
        'Alle Details zu Cookies, personenbezogenen Daten und Kontaktmöglichkeiten findest du auf der Datenschutzseite.'
    },
    desktop: {
      intro:
        'Du nutzt das Portfolio am Desktop? So navigierst du komfortabel durch die neuen Seiten.',
      steps: [
        'Die fixierte Topbar bleibt stets sichtbar – nutze Home, Projekte, Fähigkeiten, Erfahrungen und Kontakt, um zwischen den Seiten zu wechseln.',
        'Scrolle frei durch jede Seite; die Topbar folgt dir, sodass du jederzeit die Sektion wechseln kannst.',
        'Über die Menüs Sprache und Thema stellst du Übersetzung und Farbschema nach Wunsch ein.',
        'Alle Inhalte der Startseite findest du auch auf den Unterseiten in einer übersichtlichen vertikalen Darstellung.',
        'Im Bereich Kennzahlen öffnet jede Karte einen Dialog mit Details zur Berechnung.'
      ]
    },
    mobile: {
      intro:
        'Auf dem Smartphone sorgt eine kompakte Topbar für Übersicht – so verwendest du sie.',
      steps: [
        'Öffne das Seitenmenü über den neuen Button oben rechts und wähle die gewünschte Ansicht.',
        'Die Topbar bleibt oben angeheftet; nach dem Antippen schließt sich das Menü automatisch.',
        'Sprache und Thema findest du im selben Menü – passe Übersetzung und Farbstil in Sekunden an.',
        'Die Seiten sind für vertikales Scrollen optimiert, also streiche bequem durch die Inhalte.',
        'Im Bereich Kennzahlen kannst du jede Karte antippen, um einen Dialog mit weiteren Details zu öffnen.'
      ]
    }
  },
  it: {
    title: 'Guida rapida al portfolio',
    closingHint: 'Quando hai finito, puoi richiudermi: rimango sempre a portata di click.',
    privacyLink: {
      label: 'Leggi l\'informativa privacy',
      description: 'Trovi tutti i dettagli su cookie, dati personali e canali di contatto nella pagina dedicata.'
    },
    desktop: {
      intro:
        'Se stai usando il portfolio da PC, ecco come sfruttare la nuova navigazione.',
      steps: [
        'La topbar fissa resta sempre visibile: usa Home, Progetti, Competenze, Esperienze e Contatti per raggiungere le pagine dedicate.',
        'Puoi scorrere liberamente ogni pagina: la topbar ti segue così puoi cambiare sezione in qualsiasi momento.',
        'Nel menu della lingua scegli la traduzione preferita; il selettore Tema cambia la palette di colori.',
        'Le stesse informazioni della landing sono disponibili anche nelle pagine dedicate, organizzate in verticale.',
        'Nella sezione Numeri chiave ogni card è cliccabile e apre un dialog con dettagli sul calcolo del numero corrispondente.'
      ]
    },
    mobile: {
      intro:
        'Da smartphone il portfolio offre comandi dedicati al tocco: segui questi passaggi rapidi.',
      steps: [
        'Apri la barra di navigazione con il pulsante con il chevron verso il basso in basso a destra dello schermo.',
        'Muoviti tra le sezioni con le frecce su e giù della navbar: puoi anche scorrere con le dita.',
        'Tieni premuto un pulsante per mostrare il suggerimento che spiega la sua funzione.',
        'I pulsanti del tema e della lingua aprono sottomenu orizzontali a sinistra e a destra per regolare le impostazioni.',
        'Nella sezione Stack tecnologico scegli tra back, front e tooling: si apre un carosello che aggiunge le frecce sinistra e destra alla navigazione.'
      ]
    }
  },
  en: {
    title: 'Quick guide to the portfolio',
    closingHint: 'Close me once you are ready—your guide will stay one click away.',
    privacyLink: {
      label: 'Read the privacy notice',
      description: 'Head over to the dedicated page to review cookies, data usage and how to get in touch.'
    },
    desktop: {
      intro:
        "Browsing from a desktop? Here's how to make the most of the new navigation.",
      steps: [
        'The fixed top bar stays visible at all times—use Home, Projects, Skills, Experiences and Contacts to jump between dedicated pages.',
        'Scroll freely within each page; the top bar follows you so you can switch section whenever you like.',
        'Use the Language menu to pick your preferred translation and the Theme selector to change the colour palette.',
        'Every page reprises the landing content in a vertical layout, so you can explore each topic at your own pace.',
        'In the Key numbers section each card opens a dialog with details about how the metric is calculated.'
      ]
    },
    mobile: {
      intro: 'On mobile you get a compact top bar—follow these quick tips.',
      steps: [
        'Open the pages menu with the new button in the upper-right corner and pick the view you need.',
        'The top bar stays fixed at the top; after tapping an item the menu closes automatically.',
        'Language and Theme selectors live in the same menu so you can adjust style and translation instantly.',
        'Every page is optimised for vertical scrolling, so swipe through the content just like a standard app.',
        'Key numbers cards remain interactive: tap them to read the detailed explanations.'
      ]
    }
  },
  no: {
    title: 'Hurtigguide til porteføljen',
    closingHint: 'Når du er ferdig kan du lukke meg – guiden ligger alltid ett klikk unna.',
    privacyLink: {
      label: 'Les personvernerklæringen',
      description: 'På den dedikerte siden finner du detaljer om cookies, databruk og kontaktpunkter.'
    },
    desktop: {
      intro: 'Bruker du porteføljen på PC? Slik får du mest ut av den nye navigasjonen.',
      steps: [
        'Den fastlåste topplinjen er alltid synlig – bruk Hjem, Prosjekter, Kompetanser, Erfaringer og Kontakt for å hoppe mellom sidene.',
        'Du kan bla fritt på hver side; topplinjen følger deg slik at du kan bytte seksjon når som helst.',
        'Språk- og temavelgerne lar deg endre oversettelse og fargepalett etter behov.',
        'Innholdet fra landingssiden finnes også på de dedikerte sidene i et ryddig vertikalt oppsett.',
        'I seksjonen Nøkkeltall kan du åpne et dialogvindu fra hver kort for å lese hvordan tallet er beregnet.'
      ]
    },
    mobile: {
      intro: 'På mobil får du en kompakt topplinje – følg disse tipsene.',
      steps: [
        'Åpne sidenmenyen med den nye knappen øverst til høyre og velg visningen du trenger.',
        'Topplinjen blir liggende øverst; menyen lukkes automatisk etter at du har trykket på et element.',
        'Språk- og temavalgene ligger i den samme menyen, så du kan endre stil og språk med et trykk.',
        'Hver side er tilpasset vertikal scrolling, så sveip gjennom innholdet som i en vanlig app.',
        'I Nøkkeltall er hvert kort interaktivt – trykk for å lese de detaljerte forklaringene.'
      ]
    }
  },
  ru: {
    title: 'Краткое руководство по портфолио',
    closingHint: 'Когда будете готовы, просто закройте меня — помощник всегда в одном клике.',
    privacyLink: {
      label: 'Ознакомьтесь с политикой конфиденциальности',
      description: 'На отдельной странице описаны cookies, обработка данных и способы связи.'
    },
    desktop: {
      intro: 'Просматриваете портфолио с компьютера? Вот как использовать обновлённую навигацию.',
      steps: [
        'Зафиксированная верхняя панель всегда остаётся на виду: используйте пункты «Главная», «Проекты», «Навыки», «Опыт» и «Контакты», чтобы переходить между страницами.',
        'Прокручивайте содержимое любой страницы как обычно — топбар остаётся закреплённым, поэтому сменить раздел можно в любой момент.',
        'В меню языка выберите нужную локализацию, а переключатель темы изменит цветовую палитру.',
        'Все материалы из лендинга доступны и на отдельных страницах в удобном вертикальном формате.',
        'В разделе «Ключевые показатели» каждая карточка открывает диалог с подробностями расчёта.'
      ]
    },
    mobile: {
      intro: 'На мобильных устройствах доступна компактная верхняя панель — вот как ей пользоваться.',
      steps: [
        'Откройте меню страниц новой кнопкой в правом верхнем углу и выберите нужный раздел.',
        'Топбар остаётся закреплённым сверху; после нажатия пункт меню закрывается автоматически.',
        'Переключатели языка и темы находятся в том же меню, поэтому изменить стиль и перевод можно мгновенно.',
        'Каждая страница оптимизирована под вертикальную прокрутку — просто пролистывайте содержимое жестами.',
        'Карточки раздела «Ключевые показатели» интерактивны: нажмите, чтобы увидеть подробные пояснения.'
      ]
    }
  },
  es: {
    title: 'Guía rápida del portafolio',
    closingHint: 'Cuando termines, puedes cerrarme: la guía siempre estará a un clic.',
    privacyLink: {
      label: 'Lee el aviso de privacidad',
      description:
        'En la página dedicada encontrarás todos los detalles sobre cookies, datos personales y canales de contacto.'
    },
    desktop: {
      intro:
        '¿Usas el portafolio desde el ordenador? Así aprovechas la nueva navegación.',
      steps: [
        'La topbar fija permanece siempre visible: usa Inicio, Proyectos, Competencias, Experiencias y Contactos para saltar entre las páginas.',
        'Puedes desplazarte libremente por cada página; la topbar te acompaña para que cambies de sección cuando quieras.',
        'El selector de idioma y el de tema te permiten ajustar la traducción y la paleta de colores al instante.',
        'El contenido de la landing también está disponible en las páginas dedicadas con un diseño vertical y cómodo.',
        'En la sección Números clave cada tarjeta abre un diálogo con detalles sobre cómo se calcula la cifra.'
      ]
    },
    mobile: {
      intro: 'En el móvil tienes una barra superior compacta: sigue estos consejos.',
      steps: [
        'Abre el menú de páginas con el nuevo botón en la esquina superior derecha y elige la vista que necesitas.',
        'La topbar queda fija arriba; después de tocar una opción el menú se cierra automáticamente.',
        'Los selectores de idioma y tema están en el mismo menú, así puedes cambiar estilo y traducción al instante.',
        'Cada página está optimizada para el desplazamiento vertical, así que desliza el contenido como en cualquier app.',
        'Las tarjetas de Números clave siguen siendo interactivas: tócalas para leer las explicaciones detalladas.'
      ]
    }
  }
};

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
  private scrollLockState: {
    scrollY: number;
    previousBodyPosition: string;
    previousBodyTop: string;
    previousBodyWidth: string;
  } | null = null;

  readonly guideContent$: Observable<AssistantGuideVariant & {
    readonly title: string;
    readonly closingHint: string;
    readonly privacyLinkLabel: string;
    readonly privacyLinkDescription: string;
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
          steps: variant.steps,
          privacyLinkLabel: content.privacyLink.label,
          privacyLinkDescription: content.privacyLink.description
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
    this.releaseScrollLock();
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
    this.applyScrollLock();
    this.startWakeSequence();
    this.opened.emit();
  }

  closeAssistant(): void {
    if (!this.isOpen && this.animationPhase === 'sleeping') {
      return;
    }

    this.goToSleep();
  }

  onNavigateToPrivacy(): void {
    this.closeAssistant();
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
    const previousIsMobile = this.isMobile;
    const isMobile = window.innerWidth <= 768;

    this.isMobile = isMobile;
    this.isMobileSubject.next(isMobile);

    if (this.isOpen) {
      if (isMobile) {
        this.applyScrollLock();
      } else {
        this.releaseScrollLock();
      }
    }

    if (isMobile) {
      this.updateMobileViewportMetrics();
    } else {
      this.clearMobileViewportMetrics();
    }

    if (!isMobile) {
      this.resetGuideScrollState();
    }

    if (previousIsMobile !== isMobile) {
      this.handleViewportModeChange();
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

  private handleViewportModeChange(): void {
    if (this.isOpen || this.animationPhase !== 'sleeping') {
      this.goToSleep();
    } else {
      this.resetLandingCoordinates();
    }
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
    this.releaseScrollLock();

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

  private applyScrollLock(): void {
    if (!this.isBrowser || !this.isMobile || this.scrollLockState) {
      return;
    }

    const body = document.body;
    const documentElement = document.documentElement;

    if (!body || !documentElement) {
      return;
    }

    const scrollY = window.scrollY ?? window.pageYOffset ?? 0;

    this.scrollLockState = {
      scrollY,
      previousBodyPosition: body.style.position,
      previousBodyTop: body.style.top,
      previousBodyWidth: body.style.width
    };

    body.classList.add('assistant-scroll-locked');
    documentElement.classList.add('assistant-scroll-locked');

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
  }

  private releaseScrollLock(): void {
    if (!this.isBrowser || !this.scrollLockState) {
      return;
    }

    const { scrollY, previousBodyPosition, previousBodyTop, previousBodyWidth } = this.scrollLockState;
    const body = document.body;
    const documentElement = document.documentElement;

    this.scrollLockState = null;

    if (body) {
      body.classList.remove('assistant-scroll-locked');
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
    }

    if (documentElement) {
      documentElement.classList.remove('assistant-scroll-locked');
    }

    if (typeof window.scrollTo === 'function') {
      window.scrollTo(0, scrollY);
    }
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
