import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  HostListener,
  OnDestroy
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
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  currentSectionIndex = 0;
  viewInitialized = false;
  totalSections = 0;
  isScrolling = false;
  private scrollCooldownId: ReturnType<typeof setTimeout> | null = null;

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

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.scrollCooldownId) {
      clearTimeout(this.scrollCooldownId);
      this.scrollCooldownId = null;
    }
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.totalSections = this.sections?.length || 0;
    });
  }

  @HostListener('wheel', ['$event'])
  onWheelScroll(event: WheelEvent): void {
    if (!this.viewInitialized) {
      return;
    }

    if (this.isScrolling) {
      event.preventDefault();
      return;
    }

    this.isScrolling = true;

    if (event.deltaY > 0) {
      this.navigateNext();
    } else if (event.deltaY < 0) {
      this.navigatePrevious();
    }

    if (this.scrollCooldownId) {
      clearTimeout(this.scrollCooldownId);
    }

    this.scrollCooldownId = setTimeout(() => {
      this.isScrolling = false;
      this.scrollCooldownId = null;
    }, 500);
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
    if (this.viewInitialized && index !== this.currentSectionIndex && index >= 0 && index < this.totalSections) {
      this.currentSectionIndex = index;
      this.scrollToSection(index);
    }
  }

  scrollToSection(index: number): void {
    const section = this.sections.toArray()[index].nativeElement;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}