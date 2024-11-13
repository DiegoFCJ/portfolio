import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { AboutComponent } from '../../components/about/about.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectsComponent, AboutComponent, HeroComponent, SkillsComponent, NavigatorComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('section') sections!: QueryList<ElementRef>;
  currentSectionIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.updateCurrentSectionIndex();
  }

  // Listener per l'evento di scroll che aggiorna la sezione corrente
  @HostListener('window:scroll', [])
  onScroll() {
    this.updateCurrentSectionIndex();
  }

  // Metodo per aggiornare dinamicamente l'indice della sezione attualmente visibile
  updateCurrentSectionIndex() {
    const sectionElements = this.sections.toArray();
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let i = 0; i < sectionElements.length; i++) {
      const section = sectionElements[i].nativeElement;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.currentSectionIndex = i;
        this.cdr.detectChanges();
        break;
      }
    }
  }

  navigateNext() {
    if (this.sections && this.currentSectionIndex < this.sections.length - 1) {
      this.currentSectionIndex++;
      this.scrollToSection(this.currentSectionIndex);
    }
  }

  navigatePrevious() {
    if (this.sections && this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.scrollToSection(this.currentSectionIndex);
    }
  }

  scrollToSection(index: number) {
    const section = this.sections.toArray()[index].nativeElement;
    section.scrollIntoView({ behavior: 'smooth' });
  }
}