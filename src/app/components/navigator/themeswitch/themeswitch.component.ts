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
  darkMode = false;

  ngOnInit(): void {
    // All'avvio, controlla se il tema scuro è già attivo (utile se salvato nel LocalStorage)
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.updateThemeClass();
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString()); // Salva il tema selezionato
    this.updateThemeClass();
  }

  private updateThemeClass(): void {
    document.body.classList.toggle('dark-mode', this.darkMode);
  }
}
