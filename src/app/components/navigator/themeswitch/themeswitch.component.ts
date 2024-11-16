import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-themeswitch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './themeswitch.component.html',
  styleUrls: ['./themeswitch.component.scss']
})
export class ThemeswitchComponent implements OnInit {
  darkMode: boolean = false;

  ngOnInit(): void {
    // On initialization, check the stored theme preference or default to dark mode
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme === null) {
      // If no theme preference is stored, default to dark mode
      this.darkMode = true;
    } else {
      // Otherwise, use the stored value
      this.darkMode = storedTheme === 'true';
    }

    // Apply the theme (dark or light)
    this.updateThemeClass();
  }

  toggleTheme(): void {
    // Toggle dark mode
    this.darkMode = !this.darkMode;
    
    // Save the selected theme in localStorage
    localStorage.setItem('darkMode', this.darkMode.toString());

    // Apply the theme class
    this.updateThemeClass();
  }

  private updateThemeClass(): void {
    // Add or remove the 'dark-mode' class from the body element
    document.body.classList.toggle('dark-mode', this.darkMode);
  }
}
