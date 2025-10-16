import { Component } from '@angular/core';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';
import { SectionPageShellComponent } from '../shared/section-page-shell.component';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [SectionPageShellComponent, ContactMeComponent],
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss']
})
export class ContactsPageComponent {
  readonly previousRoute = '/stats';
  readonly nextRoute?: string = undefined;
}
