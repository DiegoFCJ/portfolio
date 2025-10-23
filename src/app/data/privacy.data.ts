import { LanguageCode } from '../models/language-code.type';

export interface PrivacySectionContent {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly items?: readonly string[];
}

export interface PrivacyContent {
  readonly heading: string;
  readonly meta: string;
  readonly intro: readonly string[];
  readonly tocTitle: string;
  readonly sections: readonly PrivacySectionContent[];
}

export const PRIVACY_CONTENT: Partial<Record<LanguageCode, PrivacyContent>> = {
  it: {
    heading: 'Informativa sulla privacy',
    meta: 'Ultimo aggiornamento: 28 maggio 2024',
    tocTitle: 'Indice dei contenuti',
    intro: [
      'La presente informativa descrive le modalità con cui vengono trattati i dati personali degli utenti che consultano o interagiscono con questo portfolio personale.',
      'Il trattamento avviene nel rispetto del Regolamento (UE) 2016/679 (GDPR) e della normativa nazionale in materia di protezione dei dati personali.'
    ],
    sections: [
      {
        id: 'controller',
        title: 'Titolare del trattamento',
        paragraphs: [
          'Il titolare del trattamento è Diego Fois, contattabile ai riferimenti indicati nella pagina "Contatti".',
          'Per qualsiasi domanda relativa alla presente informativa o all\'esercizio dei tuoi diritti puoi scrivere in qualunque momento.'
        ]
      },
      {
        id: 'data-types',
        title: 'Tipologie di dati trattati',
        paragraphs: [
          'Durante la navigazione vengono raccolti automaticamente alcuni dati tecnici necessari al funzionamento del sito (come indirizzi IP, identificativi dei dispositivi e log di sistema) tramite servizi di hosting e di sicurezza.',
          'L\'inserimento volontario di dati personali avviene esclusivamente tramite il modulo di contatto e riguarda informazioni identificative e di contatto fornite dall\'utente.'
        ],
        items: [
          'Dati di navigazione: dati tecnici generati dall\'utilizzo del sito, trattati in forma aggregata per finalità di sicurezza e manutenzione.',
          'Dati comunicati dall\'utente: nome, indirizzo email e contenuto del messaggio inviato tramite il modulo di contatto.'
        ]
      },
      {
        id: 'purposes-legal-basis',
        title: 'Finalità e basi giuridiche del trattamento',
        paragraphs: [
          'I dati raccolti tramite il modulo di contatto vengono utilizzati esclusivamente per rispondere alle richieste inviate dall\'utente; la base giuridica è l\'esecuzione di misure precontrattuali o l\'esecuzione di un contratto ai sensi dell\'art. 6, par. 1, lett. b) GDPR.',
          'I dati tecnici di navigazione sono trattati sulla base del legittimo interesse del titolare a garantire la sicurezza e il corretto funzionamento del sito (art. 6, par. 1, lett. f) GDPR).'
        ]
      },
      {
        id: 'processing',
        title: 'Modalità del trattamento',
        paragraphs: [
          'I dati sono trattati con strumenti informatici e telematici nel rispetto dei principi di liceità, correttezza e trasparenza.',
          'Sono adottate misure tecniche e organizzative adeguate per prevenire accessi non autorizzati, divulgazione, modifica o distruzione dei dati personali.'
        ]
      },
      {
        id: 'recipients',
        title: 'Destinatari e trasferimenti',
        paragraphs: [
          'I dati personali non vengono ceduti a soggetti terzi per finalità di marketing né diffusi pubblicamente.',
          'L\'accesso ai dati è limitato al titolare e, ove necessario, ai fornitori di servizi strettamente funzionali all\'erogazione del sito (come provider di hosting), debitamente nominati responsabili del trattamento.',
          'Eventuali trasferimenti di dati al di fuori dell\'Unione europea avvengono solo verso Paesi in grado di garantire un livello di protezione adeguato ai sensi degli artt. 44 e ss. GDPR.'
        ]
      },
      {
        id: 'retention',
        title: 'Tempi di conservazione',
        paragraphs: [
          'I dati trasmessi tramite il modulo di contatto sono conservati per il tempo necessario a gestire la richiesta e comunque non oltre 12 mesi dall\'ultimo contatto utile, salvo esigenze diverse derivanti da obblighi di legge.',
          'I dati tecnici relativi alla navigazione sono conservati per periodi limitati, in linea con le policy del provider di hosting e con le finalità di sicurezza del sito.'
        ]
      },
      {
        id: 'rights',
        title: 'Diritti dell\'interessato',
        paragraphs: [
          'Hai diritto di ottenere l\'accesso, la rettifica, l\'aggiornamento o la cancellazione dei tuoi dati personali, nonché di richiederne la limitazione o di opporti al loro trattamento.',
          'Puoi inoltre richiedere la portabilità dei dati e proporre reclamo all\'Autorità Garante per la Protezione dei Dati Personali qualora ritenga che il trattamento violi la normativa vigente.',
          'Per esercitare i tuoi diritti invia una richiesta ai recapiti indicati nella pagina "Contatti"; riceverai riscontro entro i termini previsti dal GDPR.'
        ]
      },
      {
        id: 'cookies',
        title: 'Uso dei cookie e tecnologie similari',
        paragraphs: [
          'Questo sito utilizza esclusivamente cookie tecnici necessari al funzionamento delle pagine e alla gestione delle preferenze di lingua o tema.',
          'Non sono utilizzati cookie di profilazione né strumenti di analisi di terze parti che comportino il tracciamento degli utenti a fini commerciali.'
        ],
        items: [
          'Cookie essenziali: garantiscono il caricamento delle pagine e delle funzionalità di base.',
          'Preferenze locali: memorizzano le scelte effettuate dall\'utente (ad esempio lingua o tema).'
        ]
      },
      {
        id: 'updates',
        title: 'Aggiornamenti dell\'informativa',
        paragraphs: [
          'Il titolare si riserva di aggiornare la presente informativa per adeguarla a eventuali modifiche normative o tecniche.',
          'Le modifiche saranno pubblicate su questa pagina; ti invitiamo pertanto a consultarla periodicamente.'
        ]
      }
    ]
  },
  en: {
    heading: 'Privacy notice',
    meta: 'Last updated: 28 May 2024',
    tocTitle: 'On this page',
    intro: [
      'This notice explains how personal data is processed when you browse or interact with this personal portfolio website.',
      'All processing activities comply with Regulation (EU) 2016/679 (GDPR) and applicable national data protection laws.'
    ],
    sections: [
      {
        id: 'controller',
        title: 'Data controller',
        paragraphs: [
          'The data controller is Diego Fois, who can be contacted using the details listed on the "Contacts" page.',
          'Feel free to reach out with any question about this notice or to exercise your privacy rights.'
        ]
      },
      {
        id: 'data-types',
        title: 'Categories of data processed',
        paragraphs: [
          'While you browse the website, certain technical information (such as IP addresses, device identifiers and system logs) is automatically collected by hosting and security providers to keep the service running.',
          'Personal data is otherwise collected only when you voluntarily submit it through the contact form and typically includes identification and contact details.'
        ],
        items: [
          'Browsing data: technical information generated while using the website, processed in aggregate form for security and maintenance purposes.',
          'Data you provide: your name, email address and the message content sent via the contact form.'
        ]
      },
      {
        id: 'purposes-legal-basis',
        title: 'Purposes and legal bases',
        paragraphs: [
          'Data submitted through the contact form is used solely to follow up on your request; the legal basis is the performance of pre-contractual measures or a contract pursuant to Article 6(1)(b) GDPR.',
          'Technical browsing data is processed on the basis of the controller\'s legitimate interest in ensuring the security and proper functioning of the website (Article 6(1)(f) GDPR).'
        ]
      },
      {
        id: 'processing',
        title: 'Processing methods',
        paragraphs: [
          'Data is processed through electronic tools in accordance with the principles of lawfulness, fairness and transparency.',
          'Appropriate technical and organisational measures are adopted to prevent unauthorised access, disclosure, alteration or destruction of personal data.'
        ]
      },
      {
        id: 'recipients',
        title: 'Recipients and transfers',
        paragraphs: [
          'Personal data is not sold or shared with third parties for marketing purposes and is never published.',
          'Access is restricted to the controller and, when strictly necessary, to service providers that enable the website to operate (such as hosting providers) acting as data processors.',
          'Any transfers outside the European Union occur only towards countries ensuring an adequate level of protection pursuant to Articles 44 et seq. GDPR.'
        ]
      },
      {
        id: 'retention',
        title: 'Data retention',
        paragraphs: [
          'Messages sent via the contact form are stored for as long as needed to handle your request and in any case for no longer than 12 months after the latest relevant interaction, unless legal obligations require otherwise.',
          'Technical browsing data is retained for limited periods, in line with the hosting provider\'s policies and the website\'s security purposes.'
        ]
      },
      {
        id: 'rights',
        title: 'Data subject rights',
        paragraphs: [
          'You may request access, rectification, updating or erasure of your personal data, ask for restriction or object to processing.',
          'You can also request data portability and lodge a complaint with your local supervisory authority if you believe the processing infringes data protection laws.',
          'Send your requests using the contacts provided on the "Contacts" page; a response will be provided within the time limits set by the GDPR.'
        ]
      },
      {
        id: 'cookies',
        title: 'Cookies and similar technologies',
        paragraphs: [
          'This website only uses technical cookies that are necessary to deliver pages and remember language or theme preferences.',
          'No profiling cookies or third-party analytics tools are installed for commercial tracking purposes.'
        ],
        items: [
          'Essential cookies: ensure that pages load and that core features remain available.',
          'Local preferences: store the options you select (for example language or theme).'
        ]
      },
      {
        id: 'updates',
        title: 'Notice updates',
        paragraphs: [
          'This notice may be updated to reflect legal, technical or organisational changes relevant to the processing activities.',
          'Updates will be published on this page, so please review it periodically.'
        ]
      }
    ]
  }
};
