import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-popup.component.html',
  styleUrl: './custom-popup.component.scss'
})
export class CustomPopupComponent {
  // Message displayed inside the popup
  @Input() message: string = '';

  // Visibility state of the popup
  @Input() isVisible: boolean = false;
}
