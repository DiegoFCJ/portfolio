import { LanguageCode } from '../models/language-code.type';

export interface CookieConsentContent {
  readonly message: string;
  readonly acceptLabel: string;
  readonly rejectLabel: string;
  readonly privacyLinkLabel: string;
}

export const COOKIE_CONSENT_CONTENT: Partial<Record<LanguageCode, CookieConsentContent>> = {
  it: {
    message: 'Questo sito utilizza cookie tecnici e di misurazione anonima per migliorare l\'esperienza di navigazione. Puoi accettare o rifiutare in qualsiasi momento.',
    acceptLabel: 'Accetta',
    rejectLabel: 'Rifiuta',
    privacyLinkLabel: 'Leggi l\'informativa privacy',
  },
  en: {
    message: 'This site uses technical cookies and anonymised analytics to improve your browsing experience. You can accept or refuse at any time.',
    acceptLabel: 'Accept',
    rejectLabel: 'Decline',
    privacyLinkLabel: 'Read the privacy notice',
  },
  de: {
    message: 'Diese Website verwendet technische Cookies und anonymisierte Analysen, um dein Nutzungserlebnis zu verbessern. Du kannst jederzeit zustimmen oder ablehnen.',
    acceptLabel: 'Akzeptieren',
    rejectLabel: 'Ablehnen',
    privacyLinkLabel: 'Datenschutzhinweis lesen',
  },
  es: {
    message: 'Este sitio utiliza cookies técnicas y analíticas anonimizadas para mejorar tu experiencia de navegación. Puedes aceptar o rechazar en cualquier momento.',
    acceptLabel: 'Aceptar',
    rejectLabel: 'Rechazar',
    privacyLinkLabel: 'Leer la política de privacidad',
  },
  no: {
    message: 'Nettstedet bruker tekniske informasjonskapsler og anonymisert analyse for å forbedre opplevelsen din. Du kan godta eller avslå når som helst.',
    acceptLabel: 'Godta',
    rejectLabel: 'Avslå',
    privacyLinkLabel: 'Les personvernerklæringen',
  },
  ru: {
    message: 'Этот сайт использует технические файлы cookie и анонимную аналитику, чтобы сделать работу удобнее. Вы можете принять или отклонить их в любое время.',
    acceptLabel: 'Принять',
    rejectLabel: 'Отклонить',
    privacyLinkLabel: 'Прочитать политику конфиденциальности',
  },
};
