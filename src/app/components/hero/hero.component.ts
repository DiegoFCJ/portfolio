import { Component } from '@angular/core';
import { LandingMaskComponent } from '../landing-mask/landing-mask.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LandingMaskComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
