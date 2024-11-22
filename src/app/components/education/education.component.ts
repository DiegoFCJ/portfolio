import { Component, OnInit, HostListener } from '@angular/core';
import { EducationFull } from '../../dtos/EducationDTO';
import { educationData } from '../../data/education.data';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educationList!: EducationFull;

  isLargeScreen: boolean = false;
  is2kMoreScreen: boolean = false;

  constructor(private translationService: TranslationService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isLargeScreen = event.target.innerWidth >= 1497;
    this.is2kMoreScreen = event.target.innerWidth >= 2224;
  }

  ngOnInit(): void {
    this.isLargeScreen = window.innerWidth >= 1497;
    this.is2kMoreScreen = window.innerWidth >= 2224;
    this.translationService.currentLanguage$.subscribe(language => {
      this.educationList = this.translationService.getTranslatedData<EducationFull>(educationData);
    });
  }

  resizeConditions(i: number, last: boolean): string | null {
    if ((this.isLargeScreen && (i === 2 || last)) || (!this.isLargeScreen && last) || this.is2kMoreScreen) {
      return 'full-height';
    }
    return null;
  }
}