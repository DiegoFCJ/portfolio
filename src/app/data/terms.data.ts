import { TermsLangs } from '../dtos/TermsDTO';

export const termsData: TermsLangs = {
  it: {
    pageTitle: 'Termini e Condizioni d’uso',
    lastUpdatedLabel: 'Ultimo aggiornamento:',
    lastUpdatedDate: '15 gennaio 2025',
    intro: [
      'L’accesso e l’utilizzo del sito portfolio.diegofois.dev implicano l’accettazione dei presenti Termini e Condizioni d’uso. Se non accetti anche solo una delle clausole riportate, ti invitiamo a non utilizzare il sito.',
      'Il sito è destinato a presentare l’attività professionale di Diego Fois e a permettere un primo contatto tramite il modulo dedicato.'
    ],
    sections: [
      {
        title: 'Accesso al sito',
        paragraphs: [
          'Il sito è disponibile senza registrazione. Diego Fois si riserva la facoltà di sospendere, modificare o interrompere il sito o parte di esso in qualunque momento, senza preavviso.'
        ]
      },
      {
        title: 'Uso consentito',
        paragraphs: [
          'Utilizzando il sito ti impegni a non impiegarlo per scopi contrari alla legge o che possano compromettere il funzionamento della piattaforma o l’esperienza di altri utenti.'
        ],
        list: [
          'non inviare contenuti illeciti, offensivi o che violino diritti di terzi;',
          'non tentare di compromettere la sicurezza del sito o di accedere ad aree riservate;',
          'non utilizzare script automatizzati o strumenti finalizzati alla raccolta massiva di dati.'
        ]
      },
      {
        title: 'Proprietà intellettuale',
        paragraphs: [
          'I contenuti presenti sul sito (testi, immagini, codice e layout) sono protetti dalla normativa sul diritto d’autore. È vietata la riproduzione, anche parziale, senza autorizzazione scritta del titolare.'
        ]
      },
      {
        title: 'Limitazione di responsabilità',
        paragraphs: [
          'Il sito è fornito “così com’è”. Pur ponendo attenzione alla qualità delle informazioni, Diego Fois non garantisce l’assenza di errori o l’aggiornamento continuo dei contenuti e non risponde per eventuali danni diretti o indiretti derivanti dall’utilizzo del sito.'
        ]
      },
      {
        title: 'Servizi di terzi',
        paragraphs: [
          'Il modulo di contatto si appoggia al servizio Formspree per l’inoltro delle comunicazioni. I dati inseriti sono trattati secondo la relativa informativa.',
          'Le statistiche di navigazione sono raccolte, previo consenso, tramite Google Analytics. Ulteriori informazioni sul trattamento dei dati sono disponibili nella Privacy Policy.'
        ]
      },
      {
        title: 'Modifiche ai termini',
        paragraphs: [
          'Il titolare può aggiornare i presenti Termini d’uso in qualsiasi momento. Le modifiche diventano efficaci con la loro pubblicazione sul sito.'
        ]
      },
      {
        title: 'Legge applicabile',
        paragraphs: [
          'I presenti Termini sono disciplinati dalla legge italiana. Per ogni controversia è competente il foro di Cagliari, fatti salvi i diritti inderogabili del consumatore.'
        ]
      }
    ],
    contactTitle: 'Contatti',
    contactParagraphs: [
      'Per chiarimenti sui Termini e Condizioni puoi contattare Diego Fois all’indirizzo indicato di seguito.'
    ],
    contactEmailLabel: 'E-mail:',
    contactEmail: 'diego.fois.dev@gmail.com'
  },
  en: {
    pageTitle: 'Terms of Use',
    lastUpdatedLabel: 'Last updated:',
    lastUpdatedDate: '15 January 2025',
    intro: [
      'Accessing and using portfolio.diegofois.dev implies acceptance of these Terms of Use. If you do not agree with any clause, please refrain from using the website.',
      'The site showcases Diego Fois’s professional profile and offers a first point of contact through the dedicated form.'
    ],
    sections: [
      {
        title: 'Website access',
        paragraphs: [
          'The site is available without registration. Diego Fois may suspend, modify, or discontinue the website—or any portion of it—at any time without notice.'
        ]
      },
      {
        title: 'Permitted use',
        paragraphs: [
          'By using the site you agree not to engage in activities that are unlawful or could impair the platform or other users’ experience.'
        ],
        list: [
          'do not submit unlawful, offensive, or rights-infringing content;',
          'do not attempt to compromise the site’s security or access restricted areas;',
          'do not run automated scripts or tools aimed at large-scale data extraction.'
        ]
      },
      {
        title: 'Intellectual property',
        paragraphs: [
          'All content on the site (text, images, code, and layout) is protected by copyright. Reproduction, even partial, is prohibited without the controller’s written consent.'
        ]
      },
      {
        title: 'Limitation of liability',
        paragraphs: [
          'The website is provided “as is”. While the information is carefully curated, Diego Fois does not guarantee the absence of errors or the continuous updating of content and shall not be liable for direct or indirect damages resulting from the use of the site.'
        ]
      },
      {
        title: 'Third-party services',
        paragraphs: [
          'The contact form relies on Formspree to deliver messages. Data submitted through the form is handled according to Formspree’s privacy notice.',
          'Browsing statistics are collected—subject to your consent—through Google Analytics. Further details on data processing are provided in the Privacy Policy.'
        ]
      },
      {
        title: 'Changes to the terms',
        paragraphs: [
          'The controller may update these Terms at any time. Changes become effective once published on the website.'
        ]
      },
      {
        title: 'Governing law',
        paragraphs: [
          'These Terms are governed by Italian law. Any dispute shall fall under the jurisdiction of the Court of Cagliari, without prejudice to the consumer’s mandatory rights.'
        ]
      }
    ],
    contactTitle: 'Contact',
    contactParagraphs: [
      'If you have questions regarding these Terms, please contact Diego Fois using the address below.'
    ],
    contactEmailLabel: 'E-mail:',
    contactEmail: 'diego.fois.dev@gmail.com'
  }
};
