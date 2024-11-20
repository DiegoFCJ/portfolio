import { Component } from '@angular/core';
import { SocialComponent } from '../social/social.component';
import { contactMeData } from '../../data/contact-me.data';
import { ContactMe } from '../../dtos/ContactMeDTO';
import { WinP } from '../../constants/general.const';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [SocialComponent],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent {
  WinP=WinP;
  contactMe: ContactMe = contactMeData;
}
