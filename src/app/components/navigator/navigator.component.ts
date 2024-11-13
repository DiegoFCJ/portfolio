import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, HostListener, AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeswitchComponent } from './themeswitch/themeswitch.component';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ThemeswitchComponent
  ],
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements AfterViewInit {
  @Input() totalSections: number = 0;
  @Input() currentSectionIndex: number = 1;
  @Output() navigateNext = new EventEmitter<void>();
  @Output() navigatePrevious = new EventEmitter<void>();

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    this.setupScrollObserver();
  }

  setupScrollObserver() {
    const sectionElements = document.querySelectorAll('.section');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(sectionElements).indexOf(entry.target);
          this.currentSectionIndex = index + 1;
        }
      });
    }, options);

    sectionElements.forEach(section => this.observer?.observe(section));
  }

  onNext() {
    this.navigateNext.emit();
  }

  onPrevious() {
    this.navigatePrevious.emit();
  }

  ngOnDestroy() {
    // Pulizia dell'observer quando il componente viene distrutto
    this.observer?.disconnect();
  }
}
