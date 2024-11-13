import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class NavigatorComponent {
  // Numero totale di sezioni e indice della sezione corrente
  @Input() totalSections: number = 0;
  @Input() currentSectionIndex: number = 1;

  // Eventi per comunicare con HomeComponent
  @Output() navigateNext = new EventEmitter<void>();
  @Output() navigatePrevious = new EventEmitter<void>();

  // Metodo per inviare il segnale di navigazione avanti
  onNext() {
    this.navigateNext.emit();
  }

  // Metodo per inviare il segnale di navigazione indietro
  onPrevious() {
    this.navigatePrevious.emit();
  }
}