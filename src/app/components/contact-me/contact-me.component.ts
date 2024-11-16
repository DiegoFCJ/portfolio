import { Component } from '@angular/core';
import { SocialComponent } from '../social/social.component';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [SocialComponent],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent {

}
