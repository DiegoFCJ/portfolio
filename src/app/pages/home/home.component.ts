import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],  // Add CommonModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  projects = [
    {
      title: 'Project One',
      description: 'A brief description of Project One.',
      image: 'path/to/project1-image.jpg',
      link: 'https://example.com/project1'
    },
    {
      title: 'Project Two',
      description: 'A brief description of Project Two.',
      image: 'path/to/project2-image.jpg',
      link: 'https://example.com/project2'
    },
  ];

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
