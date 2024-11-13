import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
  currentSectionIndex = 1;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Uso di ChangeDetectorRef per forzare il rilevamento delle modifiche dopo la visualizzazione
    setTimeout(() => {
      // Ritarda la modifica del valore per evitare il cambiamento immediato
      if (this.sections && this.sections.length) {
        this.currentSectionIndex = 0;
      } else {
        this.currentSectionIndex = -1;
      }
      // Forza il rilevamento delle modifiche
      this.cdr.detectChanges();
    });
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

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
}