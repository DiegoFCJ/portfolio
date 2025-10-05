import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceFull } from '../../dtos/ExperienceDTO';
import { experiencesData } from '../../data/experiences.data';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit, OnDestroy {
  experiences: ExperienceFull = experiencesData.en;
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
      this.translationService.getTranslatedData<ExperienceFull>(experiencesData).subscribe((data) => {
        this.experiences = data;
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
