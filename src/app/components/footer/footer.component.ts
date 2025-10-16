import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  link: string;
  fragment?: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  readonly quickLinks: FooterLink[] = [
    { label: 'Privacy', link: '/privacy' },
    { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
    { label: 'Social', link: '/', fragment: 'social' },
  ];
}
