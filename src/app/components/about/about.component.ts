import { Component, OnDestroy, OnInit } from '@angular/core';
import { aboutMeData } from '../../data/about-me.data';
import { AboutMe } from '../../dtos/AboutMeDTO';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  aboutMe: AboutMe = aboutMeData.en;
  isLoading = true;
  private readonly subscriptions = new Subscription();

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.translationService.currentLanguage$.subscribe(() => {
        this.isLoading = true;
      })
    );

    this.subscriptions.add(
      this.translationService.getTranslatedData<AboutMe>(aboutMeData).subscribe((data) => {
        this.aboutMe = data;
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
