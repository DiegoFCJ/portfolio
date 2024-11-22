import { Component } from '@angular/core';
import { aboutMeData } from '../../data/about-me.data';
import { AboutMe } from '../../dtos/AboutMeDTO';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  aboutMe!: AboutMe;

  constructor(private translationService: TranslationService) {
    this.translationService.currentLanguage$.subscribe(language => {
      this.aboutMe = this.translationService.getTranslatedData<AboutMe>(aboutMeData);
    });
  }
}