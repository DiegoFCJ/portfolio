import { PrivacyPolicyLangs } from '../dtos/PrivacyPolicyDTO';

export const privacyPolicyData: PrivacyPolicyLangs = {
  it: {
    pageTitle: 'Privacy Policy',
    lastUpdatedLabel: 'Ultimo aggiornamento:',
    lastUpdatedDate: '15 gennaio 2025',
    intro: [
      'Questa informativa descrive come vengono trattati i dati personali quando visiti il portfolio di Diego Fois e quando invii un messaggio tramite il modulo di contatto.',
      'I trattamenti avvengono nel rispetto del Regolamento (UE) 2016/679 ("GDPR") e della normativa nazionale in materia di protezione dei dati personali.'
    ],
    sections: [
      {
        title: 'Titolare del trattamento',
        paragraphs: [
          'Il titolare del trattamento è Diego Fois. Per qualsiasi richiesta relativa ai tuoi dati personali puoi scrivere a diego.fois.dev@gmail.com.'
        ]
      },
      {
        title: 'Dati raccolti e finalità',
        paragraphs: [
          'Quando compili il modulo di contatto vengono trattati il tuo nome, l’indirizzo e-mail e il contenuto del messaggio per rispondere alla tua richiesta.',
          'Durante la navigazione vengono raccolti, solo previo consenso, dati statistici anonimi tramite Google Analytics per analizzare l’uso del sito e migliorare i contenuti.'
        ]
      },
      {
        title: 'Base giuridica del trattamento',
        paragraphs: [
          'La base giuridica per il trattamento dei dati inseriti nel modulo di contatto è l’articolo 6, paragrafo 1, lettera b) GDPR: l’esecuzione di misure precontrattuali su richiesta dell’interessato.',
          'Le attività di analisi tramite Google Analytics si fondano sul consenso espresso dall’utente (articolo 6, paragrafo 1, lettera a) GDPR), raccolto attraverso il banner cookie.'
        ]
      },
      {
        title: 'Tempi di conservazione',
        paragraphs: [
          'I dati inviati tramite modulo di contatto sono conservati per il tempo necessario a gestire la richiesta e comunque non oltre 12 mesi dall’ultima comunicazione.',
          'I dati raccolti da Google Analytics sono memorizzati secondo le impostazioni del servizio e vengono conservati per 14 mesi.'
        ]
      },
      {
        title: 'Modalità del trattamento',
        paragraphs: [
          'I dati sono trattati con strumenti informatici adottando misure di sicurezza adeguate per impedirne l’accesso non autorizzato, la divulgazione o la perdita.'
        ]
      }
    ],
    rightsTitle: 'Diritti dell’interessato',
    rightsDescription: 'In qualunque momento puoi esercitare i diritti riconosciuti dagli articoli 15-22 del GDPR inviando una richiesta al titolare:',
    rightsList: [
      'ottenere conferma dell’esistenza o meno di dati personali che ti riguardano e accedervi;',
      'chiedere la rettifica o l’aggiornamento dei dati inesatti;',
      'richiedere la cancellazione dei dati o la limitazione del trattamento;',
      'opporti al trattamento per motivi legittimi;',
      'ricevere i dati in un formato strutturato e leggibile da dispositivo automatico (portabilità);',
      'presentare reclamo all’Autorità Garante per la protezione dei dati personali.'
    ],
    thirdPartyTitle: 'Fornitori terzi',
    thirdPartyIntro: [
      'Alcuni servizi esterni supportano il funzionamento del sito. L’accesso a tali servizi avviene solo dopo il tuo consenso dove previsto.'
    ],
    thirdPartyProviders: [
      {
        name: 'Google Analytics (Google LLC)',
        purpose: 'Monitoraggio statistico del traffico sul sito, raccolta di informazioni aggregate sulle visite e sulle pagine consultate.',
        data: 'Cookie, identificatori online e indirizzo IP anonimizzato.',
        policyLabel: 'Informativa Google',
        policyUrl: 'https://policies.google.com/privacy'
      },
      {
        name: 'Formspree',
        purpose: 'Servizio di inoltro dei messaggi inviati dal modulo di contatto verso la casella e-mail del titolare.',
        data: 'Nome, e-mail e contenuto del messaggio inseriti nel modulo di contatto.',
        policyLabel: 'Informativa Formspree',
        policyUrl: 'https://formspree.io/legal/privacy-policy/'
      }
    ],
    contact: {
      title: 'Contatti',
      paragraphs: [
        'Per domande su questa informativa o per esercitare i tuoi diritti puoi contattare il titolare all’indirizzo riportato di seguito.'
      ],
      emailLabel: 'E-mail:',
      email: 'diego.fois.dev@gmail.com'
    }
  },
  en: {
    pageTitle: 'Privacy Policy',
    lastUpdatedLabel: 'Last updated:',
    lastUpdatedDate: '15 January 2025',
    intro: [
      'This notice explains how personal data is processed when you visit Diego Fois’s portfolio and when you submit the contact form.',
      'Processing activities comply with Regulation (EU) 2016/679 (the “GDPR”) and applicable national data-protection laws.'
    ],
    sections: [
      {
        title: 'Data controller',
        paragraphs: [
          'The data controller is Diego Fois. You can reach the controller for any privacy request at diego.fois.dev@gmail.com.'
        ]
      },
      {
        title: 'Data collected and purposes',
        paragraphs: [
          'When you complete the contact form, your name, e-mail address, and message are processed so the request can be answered.',
          'While browsing, anonymised statistics are gathered—only with your consent—through Google Analytics to understand site usage and improve the content.'
        ]
      },
      {
        title: 'Legal bases',
        paragraphs: [
          'Processing of contact-form data relies on Article 6(1)(b) GDPR as it is necessary to take steps at the user’s request prior to entering into an agreement.',
          'Analytics activities through Google Analytics are performed on the basis of the consent you grant via the cookie banner (Article 6(1)(a) GDPR).'
        ]
      },
      {
        title: 'Retention periods',
        paragraphs: [
          'Messages submitted via the contact form are stored only for the time required to handle the request and, in any case, no longer than 12 months after the last contact.',
          'Google Analytics data is stored according to the service configuration and retained for 14 months.'
        ]
      },
      {
        title: 'Processing methods',
        paragraphs: [
          'Data is handled using electronic tools and appropriate security measures to prevent unauthorised access, disclosure, alteration, or loss.'
        ]
      }
    ],
    rightsTitle: 'Data subject rights',
    rightsDescription: 'You may exercise the GDPR rights listed below at any time by contacting the controller:',
    rightsList: [
      'obtain confirmation that personal data concerning you is being processed and access that data;',
      'request rectification or updating of inaccurate data;',
      'request erasure of data or restriction of processing;',
      'object to processing on legitimate grounds;',
      'receive the data in a structured, commonly used, machine-readable format (portability);',
      'lodge a complaint with the Italian Data Protection Authority or your local supervisory authority.'
    ],
    thirdPartyTitle: 'Third-party providers',
    thirdPartyIntro: [
      'Certain external services support the operation of this website. Where required, they are activated only after you have granted consent.'
    ],
    thirdPartyProviders: [
      {
        name: 'Google Analytics (Google LLC)',
        purpose: 'Statistical monitoring of site traffic and aggregated insights on visited pages.',
        data: 'Cookies, online identifiers, and an anonymised IP address.',
        policyLabel: 'Google privacy notice',
        policyUrl: 'https://policies.google.com/privacy'
      },
      {
        name: 'Formspree',
        purpose: 'Service used to deliver contact-form submissions directly to the controller’s inbox.',
        data: 'Name, e-mail address, and message content submitted through the contact form.',
        policyLabel: 'Formspree privacy notice',
        policyUrl: 'https://formspree.io/legal/privacy-policy/'
      }
    ],
    contact: {
      title: 'Contact',
      paragraphs: [
        'If you have questions about this notice or wish to exercise your rights, please reach out using the address below.'
      ],
      emailLabel: 'E-mail:',
      email: 'diego.fois.dev@gmail.com'
    }
  }
};
