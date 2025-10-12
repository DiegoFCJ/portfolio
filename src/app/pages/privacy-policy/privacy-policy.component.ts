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
import { LegalPageContent } from '../../dtos/legal-page.dto';
import { privacyPolicyData } from '../../data/privacy-policy.data';
import { TranslationService } from '../../services/translation.service';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
  content?: LegalPageContent;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly translationService: TranslationService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.translationService
      .getTranslatedData<LegalPageContent>(privacyPolicyData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((content) => {
        this.content = content;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

