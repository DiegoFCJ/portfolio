import { LegalPageTranslations } from '../dtos/legal-page.dto';

export const privacyPolicyData: LegalPageTranslations = {
  it: {
    title: 'Informativa sulla privacy',
    updatedOn: 'Ultimo aggiornamento: 20 novembre 2024',
    intro:
      'Questa informativa descrive come vengono trattati i dati personali raccolti tramite questo portfolio, ' +
      'conforme al Regolamento (UE) 2016/679 (GDPR) e alla normativa italiana vigente.',
    sections: [
      {
        title: 'Titolare del trattamento',
        paragraphs: [
          'Il titolare del trattamento è Diego Fois. Puoi contattarlo all’indirizzo diegoeffe96@gmail.com oppure attraverso il modulo di contatto presente sul sito.',
        ],
      },
      {
        title: 'Tipologia di dati, finalità e basi giuridiche',
        paragraphs: [
          'I dati personali sono trattati esclusivamente per le finalità indicate di seguito e sulla base delle corrispondenti basi giuridiche:',
        ],
        listItems: [
          'Modulo di contatto: nome, email e contenuto del messaggio sono trattati per rispondere a richieste informative o di collaborazione. Base giuridica: esecuzione di misure precontrattuali adottate su richiesta dell’interessato (art. 6, par. 1, lett. b) GDPR) e legittimo interesse del titolare a gestire le comunicazioni (art. 6, par. 1, lett. f).',
          'Dati aggregati di navigazione (Google Analytics): informazioni anonime su visite, pagine consultate, dispositivo e provenienza geografica, raccolte al solo fine di analizzare le performance del sito. Base giuridica: consenso dell’utente (art. 6, par. 1, lett. a).',
          'Log di sicurezza e dati tecnici: dati potenzialmente contenuti in log di errore o nelle comunicazioni inviate tramite l’infrastruttura del fornitore, utilizzati per garantire la sicurezza del sito. Base giuridica: legittimo interesse del titolare (art. 6, par. 1, lett. f).',
        ],
      },
      {
        title: 'Tempi di conservazione',
        paragraphs: [
          'I messaggi inviati dal modulo di contatto vengono conservati per un massimo di 12 mesi dal completamento della richiesta, salvo necessità di ulteriore conservazione per motivi legali.',
          'I dati statistici generati da Google Analytics sono conservati per 14 mesi ed elaborati in forma aggregata.',
          'I log tecnici sono conservati per il tempo strettamente necessario a garantire la sicurezza e la risoluzione di eventuali incidenti.',
        ],
      },
      {
        title: 'Cookie e gestione del consenso',
        paragraphs: [
          'Il sito utilizza cookie tecnici necessari al funzionamento e, previo consenso, cookie analitici di terze parti. Il banner di consenso ti permette di accettare o rifiutare il tracciamento analitico e contiene un link all’informativa completa.',
          'La tua scelta viene memorizzata in locale (localStorage o cookie) e rispettata su ogni successiva visita o navigazione interna. Puoi modificare o revocare il consenso in qualsiasi momento dal link presente nel footer.',
        ],
      },
      {
        title: 'Fornitori terzi',
        paragraphs: [
          'Alcuni servizi prevedono il coinvolgimento di fornitori terzi. Di seguito trovi un riepilogo con i relativi trattamenti:',
        ],
        listItems: [
          'Google Analytics (Google Ireland Limited / Google LLC): servizio di analisi web utilizzato solo previo consenso. I dati possono essere trasferiti negli Stati Uniti sulla base delle garanzie previste da Google. Informativa completa: https://policies.google.com/privacy.',
          'Formspree Inc. (USA): fornitore utilizzato per recapitare i messaggi inviati tramite il modulo di contatto. Formspree agisce come responsabile del trattamento e tratta i dati esclusivamente per inoltrare la comunicazione. Informativa: https://formspree.io/legal/privacy-policy/.',
        ],
      },
      {
        title: 'Diritti dell’interessato',
        paragraphs: [
          'Hai il diritto di ottenere l’accesso ai tuoi dati personali, la rettifica o la cancellazione degli stessi, la limitazione del trattamento, l’opposizione e la portabilità nei casi previsti dagli artt. 15-22 GDPR.',
          'Per esercitare i tuoi diritti o richiedere chiarimenti puoi inviare una richiesta a diegoeffe96@gmail.com. Hai inoltre diritto a proporre reclamo all’Autorità Garante per la Protezione dei Dati Personali.',
        ],
      },
      {
        title: 'Aggiornamenti dell’informativa',
        paragraphs: [
          'Il titolare si riserva di aggiornare periodicamente questa informativa. Gli aggiornamenti saranno pubblicati su questa pagina con l’indicazione della data dell’ultimo aggiornamento.',
        ],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updatedOn: 'Last update: 20 November 2024',
    intro:
      'This notice explains how personal data collected through this portfolio is processed in compliance with EU Regulation 2016/679 (GDPR) and applicable Italian legislation.',
    sections: [
      {
        title: 'Data controller',
        paragraphs: [
          'The data controller is Diego Fois. You can reach him at diegoeffe96@gmail.com or via the contact form available on the website.',
        ],
      },
      {
        title: 'Data categories, purposes and legal bases',
        paragraphs: [
          'Personal data are processed solely for the purposes listed below and under the corresponding legal bases:',
        ],
        listItems: [
          'Contact form: name, email address and message content are processed in order to reply to information or collaboration requests. Legal basis: steps taken at the request of the data subject prior to entering into a contract (Art. 6(1)(b) GDPR) and the controller’s legitimate interest in managing communications (Art. 6(1)(f)).',
          'Aggregated browsing data (Google Analytics): anonymous information about visits, pages viewed, device details and approximate location, collected exclusively to analyse website performance. Legal basis: the user’s consent (Art. 6(1)(a)).',
          'Security logs and technical data: data that may appear in error logs or be processed by the infrastructure provider, used to ensure the website’s security. Legal basis: the controller’s legitimate interest (Art. 6(1)(f)).',
        ],
      },
      {
        title: 'Retention periods',
        paragraphs: [
          'Messages sent through the contact form are stored for up to 12 months after the request is completed, unless further retention is required to comply with legal obligations.',
          'Statistical data generated by Google Analytics are stored for 14 months and processed in aggregate form.',
          'Technical logs are retained for the time strictly necessary to ensure security and resolve incidents.',
        ],
      },
      {
        title: 'Cookies and consent management',
        paragraphs: [
          'The site uses technical cookies required for its operation and, subject to consent, third-party analytics cookies. The consent banner allows you to accept or refuse analytics tracking and includes a link to the full policy.',
          'Your choice is stored locally (localStorage or cookies) and honoured on every subsequent visit or in-app navigation. You can change or withdraw your consent at any time using the link available in the footer.',
        ],
      },
      {
        title: 'Third-party providers',
        paragraphs: [
          'Some services rely on external providers. The main processors are summarised below:',
        ],
        listItems: [
          'Google Analytics (Google Ireland Limited / Google LLC): web analytics service used only after consent. Data may be transferred to the United States under the safeguards made available by Google. Full notice: https://policies.google.com/privacy.',
          'Formspree Inc. (USA): provider used to deliver the messages sent via the contact form. Formspree acts as a processor and handles the data solely to forward the communication. Privacy notice: https://formspree.io/legal/privacy-policy/.',
        ],
      },
      {
        title: 'Data subject rights',
        paragraphs: [
          'You can request access to your personal data, rectification, erasure, restriction of processing, objection or portability in the cases provided for by Articles 15-22 GDPR.',
          'To exercise your rights or ask for clarifications, send a request to diegoeffe96@gmail.com. You also have the right to lodge a complaint with your local supervisory authority.',
        ],
      },
      {
        title: 'Changes to this notice',
        paragraphs: [
          'The controller may update this notice from time to time. Updates will be published on this page together with the relevant revision date.',
        ],
      },
    ],
  },
};

