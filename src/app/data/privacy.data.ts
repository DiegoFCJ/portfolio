import { LanguageCode } from '../models/language-code.type';

export interface PrivacySectionContent {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly items?: readonly string[];
}

export interface PrivacyContactsContent {
  readonly title: string;
  readonly description: string;
  readonly channels: readonly PrivacyContactChannel[];
}

export interface PrivacyContactChannel {
  readonly type: 'email' | 'link';
  readonly label: string;
  readonly href: string;
  readonly display: string;
}

export interface PrivacyContent {
  readonly heading: string;
  readonly meta: string;
  readonly intro: readonly string[];
  readonly sections: readonly PrivacySectionContent[];
  readonly contacts: PrivacyContactsContent;
}

export const PRIVACY_CONTENT: Partial<Record<LanguageCode, PrivacyContent>> = {
  it: {
    heading: 'Informativa sulla privacy',
    meta: 'Ultimo aggiornamento: 20 marzo 2024',
    intro: [
      'Questa pagina descrive come tratto i dati personali e le informazioni raccolte quando utilizzi questo portfolio.',
      'Le informazioni riportate sono pensate per essere trasparenti e semplici da consultare in qualsiasi momento.'
    ],
    sections: [
      {
        id: 'privacy-policy',
        title: 'Trattamento dei dati personali',
        paragraphs: [
          'Navigando nelle pagine del portfolio non viene richiesto alcun dato personale obbligatorio.',
          'Eventuali informazioni condivise attraverso il modulo di contatto vengono utilizzate esclusivamente per rispondere al tuo messaggio e non sono cedute a terzi.',
          'I dati forniti vengono conservati in modo sicuro e solo per il tempo necessario a gestire la tua richiesta.'
        ]
      },
      {
        id: 'cookies',
        title: 'Uso dei cookie',
        paragraphs: [
          'Il sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento delle pagine e delle animazioni.',
          'Non viene effettuato alcun tracciamento a fini commerciali e non sono presenti cookie di profilazione.'
        ],
        items: [
          'Cookie essenziali: servono per fornire le funzionalità di base del sito.',
          'Preferenze locali: eventuali scelte (come lingua e tema) vengono memorizzate nel tuo browser.'
        ]
      },
      {
        id: 'rights',
        title: 'I tuoi diritti',
        paragraphs: [
          'Puoi richiedere in qualsiasi momento la conferma dell\'esistenza di dati che ti riguardano e ottenerne la cancellazione.',
          'Per esercitare i tuoi diritti scrivimi tramite i canali indicati nella sezione contatti: riceverai una risposta nel più breve tempo possibile.'
        ]
      }
    ],
    contacts: {
      title: 'Contatti',
      description: 'Per dubbi, richieste di chiarimento o esercizio dei tuoi diritti puoi utilizzare questi canali:',
      channels: [
        {
          type: 'email',
          label: 'Email',
          href: 'mailto:diegofois.dev@gmail.com',
          display: 'diegofois.dev@gmail.com'
        },
        {
          type: 'link',
          label: 'GitHub',
          href: 'https://github.com/diegofois',
          display: 'github.com/diegofois'
        }
      ]
    }
  },
  en: {
    heading: 'Privacy notice',
    meta: 'Last updated: 20 March 2024',
    intro: [
      'This page explains how personal data and information are handled while you browse this portfolio.',
      'The goal is to keep every detail transparent and easy to review whenever you need to.'
    ],
    sections: [
      {
        id: 'privacy-policy',
        title: 'Personal data processing',
        paragraphs: [
          'While you browse the site you are not asked to share mandatory personal information.',
          'Any details you decide to submit through the contact form are used solely to reply to your message and are never shared with third parties.',
          'The information you provide is stored securely and only for the time required to follow up on your request.'
        ]
      },
      {
        id: 'cookies',
        title: 'Cookie usage',
        paragraphs: [
          'The website relies only on technical cookies that keep the pages and animations working as expected.',
          'No commercial tracking takes place and no profiling cookies are stored on your device.'
        ],
        items: [
          'Essential cookies: they make sure the core features of the website stay available.',
          'Local preferences: your choices (such as language or theme) can be stored in your browser.'
        ]
      },
      {
        id: 'rights',
        title: 'Your rights',
        paragraphs: [
          'You can ask at any time whether information about you is being processed and request its deletion.',
          'To exercise your rights, write through the channels listed in the contacts section and you will receive a prompt reply.'
        ]
      }
    ],
    contacts: {
      title: 'Contacts',
      description: 'Reach out for clarifications, questions or to exercise your privacy rights using the following channels:',
      channels: [
        {
          type: 'email',
          label: 'Email',
          href: 'mailto:diegofois.dev@gmail.com',
          display: 'diegofois.dev@gmail.com'
        },
        {
          type: 'link',
          label: 'GitHub',
          href: 'https://github.com/diegofois',
          display: 'github.com/diegofois'
        }
      ]
    }
  }
};
