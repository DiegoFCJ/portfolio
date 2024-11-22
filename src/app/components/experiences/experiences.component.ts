import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceFull } from '../../dtos/ExperienceDTO';
import { experiencesData } from '../../data/experiences.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {
  experiences!: ExperienceFull;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.currentLanguage$.subscribe(language => {
      this.experiences = this.translationService.getTranslatedData<ExperienceFull>(experiencesData);
    });
  }
}
