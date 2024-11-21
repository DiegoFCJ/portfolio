import { Component } from '@angular/core';
import { aboutMeData } from '../../data/about-me.data';
import { AboutMe } from '../../dtos/AboutMeDTO';

/**
 * Component to display personal information in an "About Me" section.
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  // Data containing the title and description of the "About Me" section.
  aboutMe: AboutMe = aboutMeData;
}
