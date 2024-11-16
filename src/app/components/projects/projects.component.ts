import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { projects } from '../../data/projects.data';

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
  projects = projects;
  isMobile: boolean = false;
  currentIndex: number = 0;

  ngOnInit() {
    this.checkIfMobile();
  }

  toggleExpand(project: any): void {
    project.expanded = !project.expanded;  // Toggle stato espanso
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
    if (this.currentIndex < this.projects.length - 1) {
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
      this.currentIndex = this.projects.length - 1; // Torna all'ultima card quando arrivi all'inizio
    }
  }
}