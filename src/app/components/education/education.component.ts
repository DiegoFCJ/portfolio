import { Component, OnInit, HostListener } from '@angular/core';
import { EducationFull } from '../../dtos/EducationDTO';
import { educationData } from '../../data/education.data';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educationList: EducationFull = {
    title: '',
    education: []
  };

  isLargeScreen: boolean = false;
  is2kMoreScreen: boolean = false;

  constructor(private translationService: TranslationService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isLargeScreen = event.target.innerWidth >= 1497;
    this.is2kMoreScreen = event.target.innerWidth >= 2224;
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isLargeScreen = window.innerWidth >= 1497;
      this.is2kMoreScreen = window.innerWidth >= 2224;
    }
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