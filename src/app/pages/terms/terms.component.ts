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
import { termsData } from '../../data/terms.data';
import { TranslationService } from '../../services/translation.service';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './terms.component.html',
  styleUrls: ['../privacy-policy/privacy-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent implements OnInit, OnDestroy {
  content?: LegalPageContent;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly translationService: TranslationService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.translationService
      .getTranslatedData<LegalPageContent>(termsData)
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

