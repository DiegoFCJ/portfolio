import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { projects } from '../../data/projects.data';
import { ProjectFull } from '../../dtos/ProjectDTO';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: [
    './projects.component.scss', 
    './projects.carousel.component.scss'
  ]
})
export class ProjectsComponent implements OnInit {
  projects: ProjectFull = projects;
  isMobile: boolean = false;
  currentIndex: number = 0;
  maxChars: number = 150; // Numero massimo di caratteri da mostrare inizialmente

  ngOnInit() {
    this.checkIfMobile();
  }

  toggleExpand(project: any): void {
    project.expanded = !project.expanded;  // Toggle stato espanso
  }

  getTruncatedDescription(project: any): string {
    // Restituisce la descrizione troncata in base alla lunghezza dei caratteri
    if (project.expanded) {
      return project.description;
    } else {
      return project.description.length > this.maxChars ? 
        project.description.substring(0, this.maxChars) + '...' : 
        project.description;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768; // Impostiamo la soglia mobile
  }

  // Metodo per spostarsi alla card successiva
  moveToNext() {
    if (this.currentIndex < this.projects.projects.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Torna alla prima card quando arrivi alla fine
    }
  }

  // Metodo per spostarsi alla card precedente
  moveToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.projects.projects.length - 1; // Torna all'ultima card quando arrivi all'inizio
    }
  }
}
