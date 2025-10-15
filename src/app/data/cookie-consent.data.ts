import { LanguageCode } from '../models/language-code.type';

type CookieConsentContent = {
  message: string;
  accept: string;
  reject: string;
  privacy: string;
};

export const cookieConsentContent: Record<LanguageCode, CookieConsentContent> = {
  it: {
    message:
      'Utilizziamo i cookie per raccogliere statistiche anonime e migliorare la tua esperienza. Puoi accettare o rifiutare quando vuoi.',
    accept: 'Accetta',
    reject: 'Rifiuta',
    privacy: 'Informativa sulla privacy',
  },
  en: {
    message:
      'We use cookies to collect anonymous analytics and improve your experience. You can accept or refuse at any time.',
    accept: 'Accept',
    reject: 'Reject',
    privacy: 'Privacy policy',
  },
  de: {
    message:
      'Wir verwenden Cookies, um anonyme Statistiken zu erheben und deine Erfahrung zu verbessern. Du kannst jederzeit zustimmen oder ablehnen.',
    accept: 'Akzeptieren',
    reject: 'Ablehnen',
    privacy: 'Datenschutzerklärung',
  },
  es: {
    message:
      'Utilizamos cookies para recopilar estadísticas anónimas y mejorar tu experiencia. Puedes aceptar o rechazar en cualquier momento.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    privacy: 'Política de privacidad',
  },
  no: {
    message:
      'Vi bruker informasjonskapsler for å samle anonym statistikk og forbedre opplevelsen din. Du kan akseptere eller avslå når som helst.',
    accept: 'Godta',
    reject: 'Avslå',
    privacy: 'Personvernerklæring',
  },
  ru: {
    message:
      'Мы используем файлы cookie, чтобы собирать обезличенную статистику и улучшать работу сайта. Вы можете принять или отклонить их в любой момент.',
    accept: 'Принять',
    reject: 'Отклонить',
    privacy: 'Политика конфиденциальности',
  },
};
