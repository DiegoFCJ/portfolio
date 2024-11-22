import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-popup.component.html',
  styleUrls: ['./custom-popup.component.scss']
})
export class CustomPopupComponent {
  @Input() message: string = '';
  @Input() width?: string;
  @Input() top?: string;
  @Input() left?: string;
  @Input() transform?: string;
  @Input() seconds?: number = 3;
  isPopupVisible: boolean = false;

  togglePopup(message: string): void {
    this.message = message;
    this.isPopupVisible = true;
    setTimeout(() => {
      if (this.seconds !== undefined) {
        this.isPopupVisible = false;
      }
    }, this.seconds! * 1000);
  }
}
