import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PrivacyPolicyContent } from '../../dtos/PrivacyPolicyDTO';
import { privacyPolicyData } from '../../data/privacy-policy.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  readonly policy$: Observable<PrivacyPolicyContent> = this.translationService
    .getTranslatedData<PrivacyPolicyContent>(privacyPolicyData);

  constructor(private readonly translationService: TranslationService) {}
}
