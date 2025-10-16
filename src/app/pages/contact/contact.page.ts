import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ContactMeComponent],
  template: `
    <section class="page-section">
      <app-contact-me></app-contact-me>
    </section>
  `,
  styles: [
    `:host { display: block; }`
  ],
})
export class ContactPageComponent { }
