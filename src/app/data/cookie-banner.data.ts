import { CookieBannerLangs } from '../dtos/CookieBannerDTO';

export const cookieBannerData: CookieBannerLangs = {
  it: {
    title: 'Preferenze cookie',
    message: 'Questo sito usa cookie tecnici necessari e, solo previo consenso, Google Analytics per misurare il traffico. Puoi leggere i dettagli nella Privacy Policy.',
    policyLabel: 'Apri la Privacy Policy',
    policyRoute: '/privacy-policy',
    acceptLabel: 'Accetta tutti',
    declineLabel: 'Rifiuta analitici'
  },
  en: {
    title: 'Cookie preferences',
    message: 'This site uses necessary technical cookies and, only with your consent, Google Analytics to measure traffic. Read more in the Privacy Policy.',
    policyLabel: 'Read the Privacy Policy',
    policyRoute: '/privacy-policy',
    acceptLabel: 'Accept all',
    declineLabel: 'Reject analytics'
  }
};
