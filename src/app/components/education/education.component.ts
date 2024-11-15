// education.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { educationData } from '../../data/education.data';
import { Education } from '../../dtos/EducationDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educationList: Education[] = educationData; // Inizializza con i dati importati
  isLargeScreen: boolean = false;
  is2kMoreScreen: boolean = false;

  // Controllo delle dimensioni dello schermo
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLargeScreen = event.target.innerWidth >= 1697;
    this.is2kMoreScreen = event.target.innerWidth >= 2253;
  }

  ngOnInit(): void {
    this.isLargeScreen = window.innerWidth >= 1697;
  }

  resizeConditions(i: number, last: boolean) {
    if (this.isLargeScreen && (i === 2 || last)) {
      return 'full-height';
    } else if (!this.isLargeScreen && last){
      return 'full-height';
    } else if (this.is2kMoreScreen){
      return 'full-height';
    }
    return null;
  }
  
}
