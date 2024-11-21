import { Component, OnInit, HostListener } from '@angular/core';
import { educationData } from '../../data/education.data';
import { EducationFull } from '../../dtos/EducationDTO';
import { CommonModule } from '@angular/common';

/**
 * Component to display the education timeline with responsive design adjustments.
 */
@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  // Data containing the list of educational experiences.
  educationList: EducationFull = educationData;

  // Flag for detecting large screens.
  isLargeScreen: boolean = false;

  // Flag for detecting screens larger than 2k.
  is2kMoreScreen: boolean = false;

  /**
   * Updates the screen size flags on window resize.
   * @param event Resize event.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isLargeScreen = event.target.innerWidth >= 1497;
    this.is2kMoreScreen = event.target.innerWidth >= 2224;
  }

  /**
   * Initializes the screen size flags on component initialization.
   */
  ngOnInit(): void {
    this.isLargeScreen = window.innerWidth >= 1497;
    this.is2kMoreScreen = window.innerWidth >= 2224;
  }

  /**
   * Determines the CSS class to apply based on item index and screen size.
   * @param i Index of the current education item.
   * @param last Whether the current item is the last in the list.
   * @returns CSS class name or null.
   */
  resizeConditions(i: number, last: boolean): string | null {
    if ((this.isLargeScreen && (i === 2 || last)) || (!this.isLargeScreen && last) || this.is2kMoreScreen) {
      return 'full-height';
    }
    return null;
  }
}