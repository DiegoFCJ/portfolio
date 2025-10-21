import { Injectable } from '@angular/core';
import { NavigationItem } from '../models/navigation-item.interface';
import { LanguageCode } from '../models/language-code.type';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly navigationDictionary: Record<LanguageCode, NavigationItem[]> = {
    it: [
      { label: 'Home', route: '/', exact: true },
      { label: 'Chi sono', route: '/about' },
      { label: 'Progetti', route: '/projects' },
      { label: 'Competenze', route: '/skills' },
      { label: 'Formazione', route: '/education' },
      { label: 'Esperienze', route: '/experiences' },
      { label: 'Numeri chiave', route: '/stats' },
      { label: 'Contatti', route: '/contact' },
      { label: 'Privacy', route: '/privacy' },
    ],
    en: [
      { label: 'Home', route: '/', exact: true },
      { label: 'About', route: '/about' },
      { label: 'Projects', route: '/projects' },
      { label: 'Skills', route: '/skills' },
      { label: 'Education', route: '/education' },
      { label: 'Experiences', route: '/experiences' },
      { label: 'Stats', route: '/stats' },
      { label: 'Contacts', route: '/contact' },
      { label: 'Privacy', route: '/privacy' },
    ],
    de: [
      { label: 'Start', route: '/', exact: true },
      { label: 'Über mich', route: '/about' },
      { label: 'Projekte', route: '/projects' },
      { label: 'Fähigkeiten', route: '/skills' },
      { label: 'Ausbildung', route: '/education' },
      { label: 'Erfahrungen', route: '/experiences' },
      { label: 'Kennzahlen', route: '/stats' },
      { label: 'Kontakt', route: '/contact' },
      { label: 'Datenschutz', route: '/privacy' },
    ],
    es: [
      { label: 'Inicio', route: '/', exact: true },
      { label: 'Sobre mí', route: '/about' },
      { label: 'Proyectos', route: '/projects' },
      { label: 'Competencias', route: '/skills' },
      { label: 'Formación', route: '/education' },
      { label: 'Experiencias', route: '/experiences' },
      { label: 'Números clave', route: '/stats' },
      { label: 'Contactos', route: '/contact' },
      { label: 'Privacidad', route: '/privacy' },
    ],
    no: [
      { label: 'Hjem', route: '/', exact: true },
      { label: 'Om meg', route: '/about' },
      { label: 'Prosjekter', route: '/projects' },
      { label: 'Kompetanser', route: '/skills' },
      { label: 'Utdanning', route: '/education' },
      { label: 'Erfaringer', route: '/experiences' },
      { label: 'Nøkkeltall', route: '/stats' },
      { label: 'Kontakt', route: '/contact' },
      { label: 'Personvern', route: '/privacy' },
    ],
    ru: [
      { label: 'Главная', route: '/', exact: true },
      { label: 'Обо мне', route: '/about' },
      { label: 'Проекты', route: '/projects' },
      { label: 'Навыки', route: '/skills' },
      { label: 'Образование', route: '/education' },
      { label: 'Опыт', route: '/experiences' },
      { label: 'Статистика', route: '/stats' },
      { label: 'Контакты', route: '/contact' },
      { label: 'Конфиденциальность', route: '/privacy' },
    ],
  };

  getNavigationItems(language: LanguageCode): NavigationItem[] {
    return this.navigationDictionary[language] ?? this.navigationDictionary['it'];
  }
}
