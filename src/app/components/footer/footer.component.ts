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
    brandSubtitle: 'Progetto interfacce web chiare e accessibili.',
    highlightChips: ['UI moderne', 'Design system', 'Accessibilità'],
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
      availability: 'Aperto a nuove collaborazioni e sfide digitali.',
      invitation: 'Scrivimi quando vuoi',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Dalla Sardegna, lavoro con team distribuiti.',
    },
    bottomNote: 'Aggiornato di recente con progetti e appunti.',
    bottomLinks: [
      { label: 'Privacy', link: '/privacy' },
      { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
      { label: 'Contatti', link: '/contact' },
    ],
  },
  en: {
    brandName: 'Diego Fois',
    brandSubtitle: 'I design and build clear, accessible web interfaces.',
    highlightChips: ['Modern UI', 'Design systems', 'Accessibility'],
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
      availability: 'Open to new collaborations and digital challenges.',
      invitation: 'Say hello over email',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Based in Sardinia, working with distributed teams.',
    },
    bottomNote: 'Recently updated with projects and field notes.',
    bottomLinks: [
      { label: 'Privacy', link: '/privacy' },
      { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
      { label: 'Contact', link: '/contact' },
    ],
  },
  de: {
    brandName: 'Diego Fois',
    brandSubtitle: 'Ich gestalte klare und zugängliche Weboberflächen.',
    highlightChips: ['Moderne UI', 'Designsysteme', 'Barrierefreiheit'],
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
      availability: 'Offen für neue Kooperationen und digitale Projekte.',
      invitation: 'Schreib mir gern eine Mail',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Aus Sardinien, arbeite mit verteilten Teams.',
    },
    bottomNote: 'Zuletzt mit Projekten und Notizen aktualisiert.',
    bottomLinks: [
      { label: 'Datenschutz', link: '/privacy' },
      { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
      { label: 'Kontakt', link: '/contact' },
    ],
  },
  es: {
    brandName: 'Diego Fois',
    brandSubtitle: 'Diseño interfaces web claras y accesibles.',
    highlightChips: ['UI moderna', 'Sistemas de diseño', 'Accesibilidad'],
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
      availability: 'Abierto a nuevas colaboraciones y retos digitales.',
      invitation: 'Escríbeme cuando quieras',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Desde Cerdeña, colaboro con equipos distribuidos.',
    },
    bottomNote: 'Actualizado con proyectos y apuntes recientes.',
    bottomLinks: [
      { label: 'Privacidad', link: '/privacy' },
      { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
      { label: 'Contacto', link: '/contact' },
    ],
  },
  no: {
    brandName: 'Diego Fois',
    brandSubtitle: 'Jeg designer klare og tilgjengelige nettopplevelser.',
    highlightChips: ['Moderne UI', 'Designsystemer', 'Tilgjengelighet'],
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
      availability: 'Åpen for nye samarbeid og digitale prosjekter.',
      invitation: 'Send meg gjerne en e-post',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Basert på Sardinia, jobber med distribuerte team.',
    },
    bottomNote: 'Nylig oppdatert med prosjekter og notater.',
    bottomLinks: [
      { label: 'Personvern', link: '/privacy' },
      { label: 'Informasjonskapsler', link: '/privacy', fragment: 'cookies' },
      { label: 'Kontakt', link: '/contact' },
    ],
  },
  ru: {
    brandName: 'Диего Фойс',
    brandSubtitle: 'Я создаю понятные и доступные веб-интерфейсы.',
    highlightChips: ['Современный UI', 'Дизайн-системы', 'Доступность'],
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
      availability: 'Открыт к новым сотрудничествам и цифровым задачам.',
      invitation: 'Пишите в любое время',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'На Сардинии, работаю с распределёнными командами.',
    },
    bottomNote: 'Недавно обновлён проектами и заметками.',
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
