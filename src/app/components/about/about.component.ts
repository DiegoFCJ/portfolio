import { Component } from '@angular/core';
import { aboutMeData } from '../../data/about-me.data';
import { AboutMe } from '../../dtos/AboutMeDTO';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  aboutMe: AboutMe = aboutMeData;
}
