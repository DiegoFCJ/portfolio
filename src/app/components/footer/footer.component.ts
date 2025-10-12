import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FooterContent } from '../../dtos/footer.dto';
import { footerData } from '../../data/footer.data';
import { TranslationService } from '../../services/translation.service';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, OnDestroy {
  content?: FooterContent;
  private readonly destroy$ = new Subject<void>();
  private readonly currentYear = new Date().getFullYear().toString();

  constructor(
    private readonly translationService: TranslationService,
    private readonly cookieConsentService: CookieConsentService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.translationService
      .getTranslatedData<FooterContent>(footerData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((content) => {
        this.content = {
          ...content,
          copyrightNotice: content.copyrightNotice.replace('{{year}}', this.currentYear),
        };
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  manageCookies(): void {
    this.cookieConsentService.openPreferences();
  }

  revokeCookies(): void {
    this.cookieConsentService.revokeConsent();
  }
}

