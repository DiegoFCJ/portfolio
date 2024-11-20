import { Component } from '@angular/core';
import { SocialComponent } from '../social/social.component';
import { WinP } from '../../constants/general.const';
import { CMC } from '../../constants/contact-me.const';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [SocialComponent],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent {
  WinP=WinP;
  CMC=CMC;
}
