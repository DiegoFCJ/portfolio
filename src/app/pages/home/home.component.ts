import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { AboutComponent } from '../../components/about/about.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';
import { EducationComponent } from '../../components/education/education.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';
import { TranslationService } from '../../services/translation.service';
import { sectionTitles } from '../../data/section-titles.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProjectsComponent,
    AboutComponent,
    HeroComponent,
    SkillsComponent,
    NavigatorComponent,
    EducationComponent,
    StatsComponent,
    ContactMeComponent,
    ExperiencesComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {
  currentSectionIndex = 0;
  viewInitialized = false;
  totalSections = 0;
  sectionLabels: string[] = [];

  @ViewChildren('section') sections!: QueryList<ElementRef>;

  constructor(
    private cdr: ChangeDetectorRef,
    private translationService: TranslationService,
  ) { }

  ngOnInit(): void {
    this.translationService.currentLanguage$.subscribe(lang => {
      this.sectionLabels = sectionTitles[lang];
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.totalSections = this.sections?.length || 0;
      this.viewInitialized = true;
      this.cdr.detectChanges();
    });
  }

  navigateNext(): void {
    if (this.viewInitialized && this.currentSectionIndex < this.totalSections - 1) {
      this.currentSectionIndex++;
      this.scrollToSection(this.currentSectionIndex);
    }
  }

  navigatePrevious(): void {
    if (this.viewInitialized && this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.scrollToSection(this.currentSectionIndex);
    }
  }

  navigateTo(index: number): void {
    if (this.viewInitialized && index >= 0 && index < this.totalSections) {
      this.currentSectionIndex = index;
      this.scrollToSection(index);
    }
  }

  scrollToSection(index: number): void {
    const section = this.sections.toArray()[index].nativeElement;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}