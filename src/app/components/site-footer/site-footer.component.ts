import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { FooterContent } from '../../dtos/FooterDTO';
import { footerData } from '../../data/footer.data';
import { ConsentService } from '../../services/consent.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly content$: Observable<FooterContent> = this.translationService
    .getTranslatedData<FooterContent>(footerData);

  constructor(
    private readonly consentService: ConsentService,
    private readonly translationService: TranslationService,
  ) {}

  onManageCookies(): void {
    this.consentService.revokeConsent();
  }
}
