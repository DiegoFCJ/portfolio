import { Component } from '@angular/core';
import { Social } from '../../dtos/SocialDTO';
import { socials } from '../../data/socials.data';
import { CommonModule } from '@angular/common';

/**
 * Displays a list of social media links with icons.
 */
@Component({
  selector: 'app-social',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent {
  /**
   * List of social media data.
   */
  socialsData: Social[] = socials;
}