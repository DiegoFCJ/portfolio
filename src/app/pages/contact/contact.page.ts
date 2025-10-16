import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ContactMeComponent],
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {
  readonly title$: Observable<string>;

  constructor(private readonly translationService: TranslationService) {
    this.title$ = this.translationService.getTranslatedData(
      {
        it: 'Contatti',
        en: 'Contact',
        de: 'Kontakt',
        es: 'Contactos',
        no: 'Kontakt',
        ru: 'Контакты',
      },
      'it',
    );
  }
}
