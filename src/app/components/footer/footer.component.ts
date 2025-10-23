import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { socialsByLanguage } from '../../data/socials.data';
import { Social } from '../../dtos/SocialDTO';
import { LanguageCode } from '../../models/language-code.type';
import { TranslationService } from '../../services/translation.service';

interface FooterLink {
  label: string;
  link: string;
  fragment?: string;
  external?: boolean;
}

interface FooterGroup {
  title: string;
  links: FooterLink[];
}

interface FooterContact {
  title: string;
  availability: string;
  invitation: string;
  email: FooterLink;
  location: string;
}

interface FooterContent {
  brandName: string;
  brandSubtitle: string;
  highlightChips: string[];
  navigationGroups: FooterGroup[];
  contact: FooterContact;
  bottomNote: string;
  bottomLinks: FooterLink[];
}

const FOOTER_CONTENT = {
  it: {
    brandName: 'Diego Fois',
    brandSubtitle: 'Designer e sviluppatore front-end con sede in Sardegna.',
    highlightChips: ['Interfacce web', 'Design system', 'Accessibilità'],
    navigationGroups: [
      {
        title: 'Esplora',
        links: [
          { label: 'Home', link: '/' },
          { label: 'Chi sono', link: '/about' },
          { label: 'Progetti', link: '/projects' },
          { label: 'Competenze', link: '/skills' },
        ],
      },
      {
        title: 'Percorsi',
        links: [
          { label: 'Formazione', link: '/education' },
          { label: 'Esperienze', link: '/experiences' },
          { label: 'Statistiche', link: '/stats' },
        ],
      },
    ],
    contact: {
      title: 'Contatti',
      availability: 'Disponibile per progetti digitali e collaborazioni remote.',
      invitation: 'Scrivimi un messaggio',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Sardegna, collaboro con team in tutta Europa.',
    },
    bottomNote: 'Portfolio aggiornato con nuovi progetti e articoli.',
    bottomLinks: [
      { label: 'Privacy', link: '/privacy' },
      { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
      { label: 'Contatti', link: '/contact' },
    ],
  },
  en: {
    brandName: 'Diego Fois',
    brandSubtitle: 'Front-end designer & developer based in Sardinia.',
    highlightChips: ['Interface design', 'Design systems', 'Accessibility'],
    navigationGroups: [
      {
        title: 'Explore',
        links: [
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
          { label: 'Projects', link: '/projects' },
          { label: 'Skills', link: '/skills' },
        ],
      },
      {
        title: 'Deep dives',
        links: [
          { label: 'Education', link: '/education' },
          { label: 'Experience', link: '/experiences' },
          { label: 'Stats', link: '/stats' },
        ],
      },
    ],
    contact: {
      title: 'Contact',
      availability: 'Available for digital projects and remote-friendly teams.',
      invitation: 'Send an email',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Sardinia, working with teams across Europe.',
    },
    bottomNote: 'Portfolio updated with recent work and notes.',
    bottomLinks: [
      { label: 'Privacy', link: '/privacy' },
      { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
      { label: 'Contact', link: '/contact' },
    ],
  },
  de: {
    brandName: 'Diego Fois',
    brandSubtitle: 'Frontend-Designer und -Entwickler mit Sitz in Sardinien.',
    highlightChips: ['Weboberflächen', 'Designsysteme', 'Barrierefreiheit'],
    navigationGroups: [
      {
        title: 'Entdecken',
        links: [
          { label: 'Startseite', link: '/' },
          { label: 'Über mich', link: '/about' },
          { label: 'Projekte', link: '/projects' },
          { label: 'Fähigkeiten', link: '/skills' },
        ],
      },
      {
        title: 'Einblicke',
        links: [
          { label: 'Ausbildung', link: '/education' },
          { label: 'Erfahrungen', link: '/experiences' },
          { label: 'Statistiken', link: '/stats' },
        ],
      },
    ],
    contact: {
      title: 'Kontakt',
      availability: 'Verfügbar für digitale Projekte und ortsunabhängige Teams.',
      invitation: 'Schreib mir gern',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Sardinien, Zusammenarbeit mit Teams in ganz Europa.',
    },
    bottomNote: 'Portfolio mit aktuellen Projekten und Einblicken.',
    bottomLinks: [
      { label: 'Datenschutz', link: '/privacy' },
      { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
      { label: 'Kontakt', link: '/contact' },
    ],
  },
  es: {
    brandName: 'Diego Fois',
    brandSubtitle: 'Diseñador y desarrollador front-end con base en Cerdeña.',
    highlightChips: ['Interfaces web', 'Sistemas de diseño', 'Accesibilidad'],
    navigationGroups: [
      {
        title: 'Explorar',
        links: [
          { label: 'Inicio', link: '/' },
          { label: 'Sobre mí', link: '/about' },
          { label: 'Proyectos', link: '/projects' },
          { label: 'Habilidades', link: '/skills' },
        ],
      },
      {
        title: 'Profundiza',
        links: [
          { label: 'Formación', link: '/education' },
          { label: 'Experiencia', link: '/experiences' },
          { label: 'Estadísticas', link: '/stats' },
        ],
      },
    ],
    contact: {
      title: 'Contacto',
      availability: 'Disponible para proyectos digitales y equipos remotos.',
      invitation: 'Envíame un correo',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Cerdeña, colaboro con equipos en toda Europa.',
    },
    bottomNote: 'Portafolio actualizado con nuevos proyectos y notas.',
    bottomLinks: [
      { label: 'Privacidad', link: '/privacy' },
      { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
      { label: 'Contacto', link: '/contact' },
    ],
  },
  no: {
    brandName: 'Diego Fois',
    brandSubtitle: 'Frontend-designer og utvikler basert på Sardinia.',
    highlightChips: ['Nettsider', 'Designsystemer', 'Tilgjengelighet'],
    navigationGroups: [
      {
        title: 'Utforsk',
        links: [
          { label: 'Hjem', link: '/' },
          { label: 'Om meg', link: '/about' },
          { label: 'Prosjekter', link: '/projects' },
          { label: 'Ferdigheter', link: '/skills' },
        ],
      },
      {
        title: 'Fordypning',
        links: [
          { label: 'Utdanning', link: '/education' },
          { label: 'Erfaring', link: '/experiences' },
          { label: 'Statistikk', link: '/stats' },
        ],
      },
    ],
    contact: {
      title: 'Kontakt',
      availability: 'Tilgjengelig for digitale prosjekter og distribuerte team.',
      invitation: 'Send meg en e-post',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Sardinia, samarbeider med team i hele Europa.',
    },
    bottomNote: 'Porteføljen oppdateres med nye prosjekter.',
    bottomLinks: [
      { label: 'Personvern', link: '/privacy' },
      { label: 'Informasjonskapsler', link: '/privacy', fragment: 'cookies' },
      { label: 'Kontakt', link: '/contact' },
    ],
  },
  ru: {
    brandName: 'Диего Фойс',
    brandSubtitle: 'Фронтенд‑дизайнер и разработчик из Сардинии.',
    highlightChips: ['Веб-интерфейсы', 'Дизайн-системы', 'Доступность'],
    navigationGroups: [
      {
        title: 'Исследовать',
        links: [
          { label: 'Главная', link: '/' },
          { label: 'Обо мне', link: '/about' },
          { label: 'Проекты', link: '/projects' },
          { label: 'Навыки', link: '/skills' },
        ],
      },
      {
        title: 'Подробнее',
        links: [
          { label: 'Обучение', link: '/education' },
          { label: 'Опыт', link: '/experiences' },
          { label: 'Статистика', link: '/stats' },
        ],
      },
    ],
    contact: {
      title: 'Контакты',
      availability: 'Доступен для цифровых проектов и удалённых команд.',
      invitation: 'Напишите письмо',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Сардиния, работаю с командами по всей Европе.',
    },
    bottomNote: 'Портфолио регулярно пополняется новыми проектами.',
    bottomLinks: [
      { label: 'Конфиденциальность', link: '/privacy' },
      { label: 'Файлы cookie', link: '/privacy', fragment: 'cookies' },
      { label: 'Контакты', link: '/contact' },
    ],
  },
} satisfies Partial<Record<LanguageCode, FooterContent>>;

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  private readonly translationService = inject(TranslationService);

  readonly currentYear = new Date().getFullYear();
  readonly socials$: Observable<Social[]> = this.translationService.getTranslatedData<Social[]>(socialsByLanguage);
  readonly content$: Observable<FooterContent> = this.translationService.getTranslatedData<FooterContent>(FOOTER_CONTENT);

  trackByValue(_: number, value: string): string {
    return value;
  }

  trackByGroupTitle(_: number, group: FooterGroup): string {
    return group.title;
  }

  trackByLink(_: number, link: FooterLink): string {
    return `${link.label}-${link.link}-${link.fragment ?? ''}`;
  }

  trackBySocial(_: number, social: Social): string {
    return social.link;
  }

  getInitials(name: string): string {
    return (name ?? '')
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('')
      .slice(0, 3);
  }
}
