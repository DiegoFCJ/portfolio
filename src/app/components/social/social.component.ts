import { Component } from '@angular/core';
import { Social } from '../../dtos/SocialDTO';
import { socials } from '../../data/socials.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social.component.html',
  styleUrl: './social.component.scss'
})
export class SocialComponent {
  socialsData: Social[] = socials;
}
