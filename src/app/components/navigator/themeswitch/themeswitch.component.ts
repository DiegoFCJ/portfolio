import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

/**
 * Component for switching between dark and light themes.
 */
@Component({
  selector: 'app-themeswitch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './themeswitch.component.html',
  styleUrls: ['./themeswitch.component.scss']
})
export class ThemeswitchComponent implements OnInit {
  darkMode: boolean = false;

  /**
   * Initializes the component, checking the stored theme preference.
   */
  ngOnInit(): void {
    const storedTheme = localStorage.getItem('darkMode');
    this.darkMode = storedTheme === null ? true : storedTheme === 'true';

    this.updateThemeClass();
  }

  /**
   * Toggles between dark and light modes, stores the preference in localStorage, and applies the theme.
   */
  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.updateThemeClass();
  }

  /**
   * Applies or removes the 'dark-mode' class on the body element based on the current theme.
   */
  updateThemeClass(): void {
    document.body.classList.toggle('dark-mode', this.darkMode);
  }
}