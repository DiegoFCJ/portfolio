import { Component } from '@angular/core';
import { SocialComponent } from '../social/social.component';
import { contactMeData } from '../../data/contact-me.data';
import { ContactMe } from '../../dtos/ContactMeDTO';
import { WinP } from '../../constants/general.const';

/**
 * Component to display the "Contact Me" section with social links and additional details.
 */
@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [SocialComponent],
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent {
  // Constant for additional details to display in the component.
  WinP = WinP;

  // Data for the "Contact Me" section.
  contactMe: ContactMe = contactMeData;
}
