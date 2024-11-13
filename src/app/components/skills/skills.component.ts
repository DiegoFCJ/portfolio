import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { skills } from '../../data/skills.data';
import { Skill } from '../../dtos/SkillDTO';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './skills.component.html',
  styleUrls: [
    './skills.component.scss',
    './skills.carousel.component.scss'
  ]
})
export class SkillsComponent implements OnInit {
  sections: Skill[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Variabili per il carosello
  isMobile: boolean = false;
  currentIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.sections = skills.map(section => ({
      ...section,
      skills: section.skills.map(skill => ({ ...skill, clicked: false }))
    }));
    this.loading = false;
    this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  // Metodo per spostarsi alla sezione successiva
  moveToNext() {
    if (this.currentIndex < this.sections.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Torna alla prima sezione quando arrivi alla fine
    }
  }

  // Metodo per spostarsi alla sezione precedente
  moveToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.sections.length - 1; // Torna all'ultima sezione quando arrivi all'inizio
    }
  }

  onSkillClick(event: MouseEvent, skill: any): void {
    // Toggle the clicked state of the skill
    skill.clicked = !skill.clicked;
  
    // Optionally, display a message when the image is clicked
    if (skill.clicked) {
      const message = document.createElement('div');
      message.textContent = 'Compliments! You discovered the Easter egg!';
      message.style.position = 'absolute';
      message.style.top = '10px';
      message.style.left = '50%';
      message.style.transform = 'translateX(-50%)';
      message.style.fontSize = '1.2rem';
      message.style.color = '#0073e6';
      message.style.fontWeight = 'bold';
      message.style.zIndex = '10';
      message.style.textAlign = 'center';
  
      // Cast event.target to HTMLElement to avoid TypeScript error
      const targetElement = event.target as HTMLElement;
  
      // Append the message to the image's parent element
      targetElement.parentElement?.appendChild(message);
  
      // Remove the message after 3 seconds
      setTimeout(() => {
        message.remove();
      }, 3000);
    }
  }
}