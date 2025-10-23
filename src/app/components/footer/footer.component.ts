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
    brandSubtitle: 'Costruisco esperienze digitali che uniscono design, prodotto e persone.',
    highlightChips: ['Frontend moderno', 'Design system', 'Soluzioni data-driven'],
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
          { label: 'Contattami', link: '/contact' },
        ],
      },
    ],
    contact: {
      title: 'Restiamo in contatto',
      availability: 'Disponibile per nuove opportunità e collaborazioni ibride o da remoto.',
      invitation: 'Scrivimi quando vuoi',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Basato in Sardegna, lavoro con team distribuiti in tutta Europa.',
    },
    bottomNote: 'Creato con attenzione al dettaglio e tanta curiosità verso ciò che verrà.',
    bottomLinks: [
      { label: 'Privacy', link: '/privacy' },
      { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
      { label: 'Contatti', link: '/contact' },
    ],
  },
  en: {
    brandName: 'Diego Fois',
    brandSubtitle: 'I craft digital experiences that connect design, product, and people.',
    highlightChips: ['Modern front-end', 'Design systems', 'Data-driven solutions'],
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
          { label: 'Contact', link: '/contact' },
        ],
      },
    ],
    contact: {
      title: 'Let’s connect',
      availability: 'Open to new opportunities and remote-friendly collaborations.',
      invitation: 'Drop me a line',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Based in Sardinia, partnering with distributed teams across Europe.',
    },
    bottomNote: 'Built with a detail-oriented mindset and plenty of curiosity for what comes next.',
    bottomLinks: [
      { label: 'Privacy', link: '/privacy' },
      { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
      { label: 'Contact', link: '/contact' },
    ],
  },
  de: {
    brandName: 'Diego Fois',
    brandSubtitle: 'Ich gestalte digitale Erlebnisse, die Design, Produkt und Menschen verbinden.',
    highlightChips: ['Modernes Frontend', 'Designsysteme', 'Datengetriebene Lösungen'],
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
          { label: 'Kontakt', link: '/contact' },
        ],
      },
    ],
    contact: {
      title: 'Lass uns vernetzen',
      availability: 'Offen für neue Chancen sowie hybride oder Remote-Zusammenarbeit.',
      invitation: 'Schreib mir gerne',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Mit Sitz in Sardinien, arbeite ich mit verteilten Teams in ganz Europa.',
    },
    bottomNote: 'Mit Liebe zum Detail und viel Neugier auf das, was als Nächstes kommt.',
    bottomLinks: [
      { label: 'Datenschutz', link: '/privacy' },
      { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
      { label: 'Kontakt', link: '/contact' },
    ],
  },
  es: {
    brandName: 'Diego Fois',
    brandSubtitle: 'Creo experiencias digitales que conectan diseño, producto y personas.',
    highlightChips: ['Frontend moderno', 'Sistemas de diseño', 'Soluciones basadas en datos'],
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
          { label: 'Contacto', link: '/contact' },
        ],
      },
    ],
    contact: {
      title: 'Hablemos',
      availability: 'Disponible para nuevas oportunidades y colaboraciones remotas o híbridas.',
      invitation: 'Escríbeme cuando quieras',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Con base en Cerdeña, colaboro con equipos distribuidos por toda Europa.',
    },
    bottomNote: 'Creado con atención al detalle y mucha curiosidad por lo que viene.',
    bottomLinks: [
      { label: 'Privacidad', link: '/privacy' },
      { label: 'Cookies', link: '/privacy', fragment: 'cookies' },
      { label: 'Contacto', link: '/contact' },
    ],
  },
  no: {
    brandName: 'Diego Fois',
    brandSubtitle: 'Jeg bygger digitale opplevelser som kobler design, produkt og mennesker.',
    highlightChips: ['Moderne frontend', 'Designsystemer', 'Datadrevne løsninger'],
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
          { label: 'Kontakt', link: '/contact' },
        ],
      },
    ],
    contact: {
      title: 'La oss ta kontakt',
      availability: 'Åpen for nye muligheter og samarbeid som fungerer på avstand.',
      invitation: 'Send meg gjerne en melding',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Holder til på Sardinia, samarbeider med distribuerte team over hele Europa.',
    },
    bottomNote: 'Bygget med sans for detaljer og nysgjerrighet på hva som kommer videre.',
    bottomLinks: [
      { label: 'Personvern', link: '/privacy' },
      { label: 'Informasjonskapsler', link: '/privacy', fragment: 'cookies' },
      { label: 'Kontakt', link: '/contact' },
    ],
  },
  ru: {
    brandName: 'Диего Фойс',
    brandSubtitle: 'Создаю цифровые решения, объединяющие дизайн, продукт и людей.',
    highlightChips: ['Современный фронтенд', 'Дизайн-системы', 'Решения на основе данных'],
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
          { label: 'Контакты', link: '/contact' },
        ],
      },
    ],
    contact: {
      title: 'Будем на связи',
      availability: 'Открыт для новых предложений и удалённого сотрудничества.',
      invitation: 'Пишите в любое время',
      email: { label: 'diegoeffe96@gmail.com', link: 'mailto:diegoeffe96@gmail.com', external: true },
      location: 'Находясь на Сардинии, работаю с распределёнными командами по всей Европе.',
    },
    bottomNote: 'Создано с вниманием к деталям и большой любознательностью к будущему.',
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
