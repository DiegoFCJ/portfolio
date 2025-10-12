import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CookieConsentService } from '../../services/cookie-consent.service';
import { TranslationService } from '../../services/translation.service';
import { CookieBannerContent } from '../../dtos/cookie-consent.dto';
import { cookieBannerData } from '../../data/cookie-consent-banner.data';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cookie-consent-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cookie-consent-banner.component.html',
  styleUrls: ['./cookie-consent-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentBannerComponent implements OnInit, OnDestroy {
  content?: CookieBannerContent;
  isVisible = false;

  private readonly destroy$ = new Subject<void>();
  private readonly isBrowser: boolean;

  constructor(
    private readonly cookieConsentService: CookieConsentService,
    private readonly translationService: TranslationService,
    private readonly cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.translationService
      .getTranslatedData<CookieBannerContent>(cookieBannerData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((content) => {
        this.content = content;
        this.cdr.markForCheck();
      });

    this.cookieConsentService.bannerVisible$
      .pipe(takeUntil(this.destroy$))
      .subscribe((visible) => {
        if (!this.isBrowser) {
          return;
        }

        this.isVisible = visible;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  accept(): void {
    this.cookieConsentService.acceptAnalytics();
  }

  reject(): void {
    this.cookieConsentService.rejectAnalytics();
  }
}

