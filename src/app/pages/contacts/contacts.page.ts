import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, ContactMeComponent],
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss']
})
export class ContactsPageComponent { }
