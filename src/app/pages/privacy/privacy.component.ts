import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrivacyContent, PRIVACY_CONTENT } from '../../data/privacy.data';
import { TranslationService } from '../../services/translation.service';
import { NavigatorComponent } from '../../components/navigator/navigator.component';
import { ViewportService } from '../../services/viewport.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, NavigatorComponent],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {
  readonly content$: Observable<PrivacyContent>;
  protected readonly isMobileViewport$: Observable<boolean>;

  constructor(
    private readonly translationService: TranslationService,
    private readonly viewportService: ViewportService,
  ) {
    this.content$ = this.translationService
      .getTranslatedData<PrivacyContent>(PRIVACY_CONTENT, 'it')
      .pipe(map((content) => content ?? PRIVACY_CONTENT.it!));
    this.isMobileViewport$ = this.viewportService.isMobile$;
  }
}
