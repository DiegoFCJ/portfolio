import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-mask',
  standalone: true,
  templateUrl: './landing-mask.component.html',
  styleUrls: ['./landing-mask.component.scss']
})
export class LandingMaskComponent implements OnInit {
  
  circles = [
    { class: 'top-left-circle', startX: -100, startY: -100 },
    { class: 'center-left-circle', startX: -50, startY: -50 },
    { class: 'bottom-center-circle', startX: 50, startY: 100 },
    { class: 'center-right-circle', startX: 100, startY: -50 }
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.circles.forEach(circle => this.animateCircle(circle));
  }

  animateCircle(circle: { class: string; startX: number; startY: number }): void {
    const circleElement = this.el.nativeElement.querySelector(`.${circle.class}`);
    const randomSize = `${Math.floor(Math.random() * (600 - 400 + 1)) + 400}px`;
    const duration = Math.random() * 4 + 7; // Durata tra 7 e 11 secondi

    this.renderer.setStyle(circleElement, 'width', randomSize);
    this.renderer.setStyle(circleElement, 'height', randomSize);

    const keyframes = [
      { transform: `translate(${circle.startX}%, ${circle.startY}%) scale(0.5)`, opacity: 0 },
      { transform: `translate(0, 0) scale(1)`, opacity: 0.4 }
    ];

    // Esegui l’animazione con Web Animations API
    circleElement.animate(keyframes, {
      duration: duration * 1000,
      easing: 'ease-in-out',
      fill: 'forwards'
    });
  }
}
