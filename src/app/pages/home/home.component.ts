import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  HostListener
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
  isScrolling = false;
  private scrollResetTimeoutId: ReturnType<typeof setTimeout> | null = null;

  @ViewChildren('section') sections!: QueryList<ElementRef>;

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      this.navigateNext();
    } else if (event.key === 'ArrowUp') {
      this.navigatePrevious();
    }
  }

  @HostListener('wheel', ['$event'])
  onWheelScroll(event: WheelEvent): void {
    const sectionsArray = this.sections?.toArray() ?? [];
    const computedTotalSections = sectionsArray.length;

    if (computedTotalSections === 0) {
      return;
    }

    this.totalSections = computedTotalSections;

    if (this.isScrolling) {
      event.preventDefault();
      return;
    }

    const shouldNavigateNext =
      event.deltaY > 0 && (
        this.currentSectionIndex < computedTotalSections - 1 ||
        (computedTotalSections === 1 && this.currentSectionIndex === 0)
      );

    if (shouldNavigateNext) {
      this.isScrolling = true;
      const originalTotalSections = this.totalSections;

      if (this.currentSectionIndex >= this.totalSections - 1) {
        this.totalSections = this.currentSectionIndex + 2;
      }

      this.navigateNext();
      this.totalSections = originalTotalSections;
    } else if (event.deltaY < 0 && this.currentSectionIndex > 0) {
      this.isScrolling = true;
      this.navigatePrevious();
    }

    if (this.isScrolling) {
      if (this.scrollResetTimeoutId) {
        clearTimeout(this.scrollResetTimeoutId);
      }

      this.scrollResetTimeoutId = setTimeout(() => {
        this.isScrolling = false;
        this.scrollResetTimeoutId = null;
      }, 600);
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.totalSections = this.sections?.length || 0;
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

  scrollToSection(index: number): void {
    const sections = this.sections?.toArray() ?? [];
    const section = sections[index];

    if (!section) {
      return;
    }

    section.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}