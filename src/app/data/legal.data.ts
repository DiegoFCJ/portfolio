import { LegalDocumentMap } from '../models/legal-document.model';

export const PRIVACY_POLICY_CONTENT: LegalDocumentMap = {
  it: {
    title: 'Informativa sulla Privacy',
    lastUpdated: 'Aggiornata il 17 novembre 2024',
    intro: [
      'Questa informativa descrive come vengono raccolti, utilizzati e protetti i dati personali quando visiti questo portfolio online o invii una richiesta tramite il modulo di contatto.',
      'Il trattamento dei dati avviene nel rispetto del Regolamento (UE) 2016/679 (GDPR) e della normativa nazionale applicabile.'
    ],
    sections: [
      {
        id: 'data-controller',
        title: 'Titolare del trattamento',
        paragraphs: [
          'Titolare del trattamento è Diego Gualtierotti. Per qualsiasi richiesta inerente alla protezione dei dati personali puoi scrivere a diego.gualtierotti@gmail.com.'
        ]
      },
      {
        id: 'data-purpose',
        title: 'Tipologie di dati trattati e finalità',
        paragraphs: [
          'Durante la navigazione vengono raccolti automaticamente dati tecnici (indirizzo IP anonimo, informazioni sul browser, log di navigazione) necessari al funzionamento del sito e alla sicurezza.',
          'Compilando il modulo di contatto vengono trattati nome, indirizzo e-mail e contenuto del messaggio per rispondere alla tua richiesta.'
        ],
        list: [
          'Erogazione del sito e monitoraggio del suo corretto funzionamento',
          'Risposta ai messaggi ricevuti tramite il modulo di contatto',
          'Analisi aggregata e anonima del traffico per migliorare i contenuti'
        ]
      },
      {
        id: 'legal-basis',
        title: 'Base giuridica del trattamento',
        paragraphs: [
          'La base giuridica per il trattamento dei dati tecnici è il legittimo interesse del titolare a garantire sicurezza e funzionamento del sito (art. 6.1.f GDPR).',
          'I dati inviati tramite modulo di contatto sono trattati per l’esecuzione di misure precontrattuali richieste dall’interessato (art. 6.1.b GDPR).',
          'L’uso di cookie analitici di terze parti avviene esclusivamente previo consenso espresso dell’utente (art. 6.1.a GDPR).'
        ]
      },
      {
        id: 'retention',
        title: 'Tempi di conservazione',
        paragraphs: [
          'I dati tecnici anonimizzati utilizzati per la sicurezza vengono conservati per un massimo di 12 mesi.',
          'I messaggi inviati tramite modulo di contatto sono conservati per il tempo necessario a gestire la richiesta e comunque non oltre 24 mesi.',
          'I consensi relativi ai cookie vengono registrati per 12 mesi, trascorsi i quali viene richiesto un nuovo consenso.'
        ]
      },
      {
        id: 'data-subject-rights',
        title: 'Diritti degli interessati',
        paragraphs: [
          'Hai diritto di richiedere l’accesso ai tuoi dati personali, la rettifica, la cancellazione o la limitazione del trattamento, nonché di opporti al trattamento nei casi previsti.',
          'Puoi inoltre revocare in qualsiasi momento il consenso prestato senza pregiudicare la liceità del trattamento basata sul consenso prima della revoca.',
          'Per esercitare i tuoi diritti puoi scrivere a diego.gualtierotti@gmail.com. Hai anche il diritto di proporre reclamo all’Autorità Garante per la Protezione dei Dati Personali.'
        ]
      },
      {
        id: 'cookies',
        title: 'Cookie e strumenti analoghi',
        paragraphs: [
          'Il sito utilizza cookie tecnici strettamente necessari al funzionamento e cookie di analisi statistica anonimizzati. I cookie analitici (Google Analytics) vengono attivati solo dopo il tuo consenso tramite il banner di gestione.',
          'Puoi modificare o revocare le tue preferenze sui cookie in qualsiasi momento attraverso il pulsante "Gestisci cookie" presente nel footer o riaprendo il banner.'
        ]
      },
      {
        id: 'third-parties',
        title: 'Fornitori terzi',
        paragraphs: [
          'Google Analytics (Google Ireland Limited) è utilizzato per raccogliere statistiche aggregate sull’utilizzo del sito. Il servizio anonimizza gli indirizzi IP e i dati sono conservati per 14 mesi. Le informazioni possono essere trasferite negli Stati Uniti sulla base delle Clausole Contrattuali Standard.',
          'Formspree (Formspree, Inc.) è il fornitore utilizzato per recapitare i messaggi del modulo di contatto. I dati vengono trattati solo per inoltrare la tua richiesta e sono soggetti all’informativa privacy di Formspree.'
        ]
      },
      {
        id: 'transfers',
        title: 'Trasferimenti verso Paesi terzi',
        paragraphs: [
          'Nel caso di utilizzo di servizi offerti da soggetti stabiliti fuori dallo Spazio Economico Europeo, il trasferimento avviene sulla base di adeguate garanzie come le Clausole Contrattuali Standard approvate dalla Commissione Europea.'
        ]
      },
      {
        id: 'changes',
        title: 'Modifiche all’informativa',
        paragraphs: [
          'La presente informativa può essere aggiornata per riflettere modifiche normative o evoluzioni dei servizi offerti. Eventuali cambiamenti significativi saranno comunicati attraverso il sito.'
        ]
      }
    ]
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Updated on 17 November 2024',
    intro: [
      'This notice explains how personal data is collected, used and protected when you browse this online portfolio or submit a request through the contact form.',
      'Data processing is carried out in compliance with Regulation (EU) 2016/679 (GDPR) and applicable local legislation.'
    ],
    sections: [
      {
        id: 'data-controller',
        title: 'Data controller',
        paragraphs: [
          'The data controller is Diego Gualtierotti. For any question regarding data protection you can write to diego.gualtierotti@gmail.com.'
        ]
      },
      {
        id: 'data-purpose',
        title: 'Types of data and purposes',
        paragraphs: [
          'While you browse, technical data (anonymised IP address, browser information, navigation logs) are automatically collected to operate the website securely.',
          'When you fill in the contact form, your name, e-mail address and message are processed in order to answer your request.'
        ],
        list: [
          'Provide the website and monitor its proper operation',
          'Reply to messages received through the contact form',
          'Analyse aggregated, anonymised traffic to improve content'
        ]
      },
      {
        id: 'legal-basis',
        title: 'Lawful basis',
        paragraphs: [
          'Technical data are processed on the basis of the legitimate interest of the controller to keep the website secure and functional (Art. 6.1.f GDPR).',
          'Information submitted through the contact form is processed to take steps at the request of the data subject prior to entering into a contract (Art. 6.1.b GDPR).',
          'Third-party analytics cookies are only activated after the user has granted explicit consent (Art. 6.1.a GDPR).'
        ]
      },
      {
        id: 'retention',
        title: 'Retention period',
        paragraphs: [
          'Anonymised technical logs kept for security are stored for up to 12 months.',
          'Messages received via the contact form are retained for the time necessary to handle the request and in any case no longer than 24 months.',
          'Cookie consent records are stored for 12 months, after which a new choice is requested.'
        ]
      },
      {
        id: 'data-subject-rights',
        title: 'Data subject rights',
        paragraphs: [
          'You may request access to your personal data, rectify it, obtain its erasure, restrict processing or object to processing where provided for.',
          'You can also withdraw your consent at any time without affecting the lawfulness of processing based on consent before its withdrawal.',
          'To exercise your rights please write to diego.gualtierotti@gmail.com. You also have the right to lodge a complaint with your competent supervisory authority.'
        ]
      },
      {
        id: 'cookies',
        title: 'Cookies and similar tools',
        paragraphs: [
          'The site uses strictly necessary technical cookies and anonymised analytics cookies. Analytics cookies (Google Analytics) are activated only after consent is granted via the preference banner.',
          'You can change or withdraw your cookie preferences at any time through the "Manage cookies" button in the footer or by reopening the banner.'
        ]
      },
      {
        id: 'third-parties',
        title: 'Third-party providers',
        paragraphs: [
          'Google Analytics (Google Ireland Limited) is used to collect aggregate statistics about site usage. IP addresses are anonymised and the data are retained for 14 months. Information may be transferred to the United States under Standard Contractual Clauses.',
          'Formspree (Formspree, Inc.) delivers the contact form messages. Data are processed solely to forward your request and are subject to Formspree’s privacy notice.'
        ]
      },
      {
        id: 'transfers',
        title: 'International transfers',
        paragraphs: [
          'Where services are provided by organisations located outside the European Economic Area, transfers rely on appropriate safeguards such as the Standard Contractual Clauses adopted by the European Commission.'
        ]
      },
      {
        id: 'changes',
        title: 'Changes to this notice',
        paragraphs: [
          'This policy may be updated to reflect regulatory changes or improvements to the services provided. Any material changes will be communicated through the website.'
        ]
      }
    ]
  },
  de: {
    title: 'Datenschutzerklärung',
    lastUpdated: 'Aktualisiert am 17. November 2024',
    intro: [
      'Diese Erklärung erläutert, wie personenbezogene Daten verarbeitet werden, wenn Sie dieses Online-Portfolio besuchen oder über das Kontaktformular eine Anfrage senden.',
      'Die Verarbeitung erfolgt im Einklang mit der Datenschutz-Grundverordnung (EU) 2016/679 (DSGVO) und den anwendbaren nationalen Vorschriften.'
    ],
    sections: [
      {
        id: 'data-controller',
        title: 'Verantwortlicher',
        paragraphs: [
          'Verantwortlich für die Datenverarbeitung ist Diego Gualtierotti. Bei Fragen zum Datenschutz können Sie sich unter diego.gualtierotti@gmail.com melden.'
        ]
      },
      {
        id: 'data-purpose',
        title: 'Verarbeitete Daten und Zwecke',
        paragraphs: [
          'Während des Besuchs werden automatisch technische Daten (anonymisierte IP-Adresse, Browser-Informationen, Navigationsprotokolle) erhoben, die für den sicheren Betrieb der Website erforderlich sind.',
          'Wenn Sie das Kontaktformular ausfüllen, werden Ihr Name, Ihre E-Mail-Adresse und die Nachricht verarbeitet, um auf Ihre Anfrage zu antworten.'
        ],
        list: [
          'Bereitstellung der Website und Überwachung ihres ordnungsgemäßen Betriebs',
          'Beantwortung von Nachrichten, die über das Kontaktformular eingehen',
          'Aggregierte und anonymisierte Analyse des Verkehrs zur Verbesserung der Inhalte'
        ]
      },
      {
        id: 'legal-basis',
        title: 'Rechtsgrundlagen',
        paragraphs: [
          'Technische Daten werden auf Grundlage des berechtigten Interesses des Verantwortlichen verarbeitet, die Website sicher und funktionsfähig zu halten (Art. 6 Abs. 1 lit. f DSGVO).',
          'Die über das Kontaktformular übermittelten Informationen werden zur Durchführung vorvertraglicher Maßnahmen verarbeitet, die auf Ihre Anfrage erfolgen (Art. 6 Abs. 1 lit. b DSGVO).',
          'Analyse-Cookies von Drittanbietern werden nur nach Ihrer ausdrücklichen Einwilligung gesetzt (Art. 6 Abs. 1 lit. a DSGVO).'
        ]
      },
      {
        id: 'retention',
        title: 'Speicherdauer',
        paragraphs: [
          'Anonymisierte Sicherheitsprotokolle werden höchstens 12 Monate lang gespeichert.',
          'Nachrichten aus dem Kontaktformular werden so lange aufbewahrt, wie es zur Bearbeitung Ihrer Anfrage erforderlich ist, höchstens jedoch 24 Monate.',
          'Ihre Cookie-Einwilligung wird 12 Monate lang gespeichert, danach wird erneut um eine Entscheidung gebeten.'
        ]
      },
      {
        id: 'data-subject-rights',
        title: 'Rechte der betroffenen Personen',
        paragraphs: [
          'Sie haben das Recht, Auskunft über Ihre personenbezogenen Daten zu erhalten, sie zu berichtigen, löschen zu lassen oder die Verarbeitung einzuschränken sowie unter den vorgesehenen Voraussetzungen Widerspruch einzulegen.',
          'Sie können Ihre Einwilligung jederzeit widerrufen, ohne dass die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung berührt wird.',
          'Zur Ausübung Ihrer Rechte schreiben Sie bitte an diego.gualtierotti@gmail.com. Zudem haben Sie das Recht, eine Beschwerde bei Ihrer zuständigen Aufsichtsbehörde einzureichen.'
        ]
      },
      {
        id: 'cookies',
        title: 'Cookies und ähnliche Technologien',
        paragraphs: [
          'Diese Website setzt technisch notwendige Cookies sowie anonymisierte Analyse-Cookies ein. Analyse-Cookies (Google Analytics) werden erst nach Ihrer Zustimmung über das Präferenzbanner aktiviert.',
          'Sie können Ihre Cookie-Einstellungen jederzeit über die Schaltfläche „Cookies verwalten“ im Footer ändern oder den Banner erneut öffnen.'
        ]
      },
      {
        id: 'third-parties',
        title: 'Drittanbieter',
        paragraphs: [
          'Google Analytics (Google Ireland Limited) dient der Erhebung aggregierter Nutzungsstatistiken. IP-Adressen werden anonymisiert und die Daten 14 Monate lang gespeichert. Informationen können auf Grundlage der Standardvertragsklauseln in die USA übertragen werden.',
          'Formspree (Formspree, Inc.) leitet die Nachrichten aus dem Kontaktformular weiter. Die Daten werden ausschließlich zur Übermittlung Ihrer Anfrage verarbeitet und unterliegen der Datenschutzerklärung von Formspree.'
        ]
      },
      {
        id: 'transfers',
        title: 'Übermittlungen in Drittländer',
        paragraphs: [
          'Erfolgen Dienstleistungen durch Anbieter außerhalb des Europäischen Wirtschaftsraums, stützen sich die Übermittlungen auf geeignete Garantien wie die von der Europäischen Kommission verabschiedeten Standardvertragsklauseln.'
        ]
      },
      {
        id: 'changes',
        title: 'Änderungen dieser Erklärung',
        paragraphs: [
          'Diese Datenschutzerklärung kann aktualisiert werden, um gesetzlichen Änderungen oder Weiterentwicklungen der angebotenen Dienste Rechnung zu tragen. Wesentliche Änderungen werden über die Website bekanntgegeben.'
        ]
      }
    ]
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Actualizada el 17 de noviembre de 2024',
    intro: [
      'Esta política explica cómo se recaban, utilizan y protegen los datos personales cuando visitas este portafolio en línea o envías una solicitud a través del formulario de contacto.',
      'El tratamiento se realiza conforme al Reglamento (UE) 2016/679 (RGPD) y a la normativa nacional aplicable.'
    ],
    sections: [
      {
        id: 'data-controller',
        title: 'Responsable del tratamiento',
        paragraphs: [
          'El responsable del tratamiento es Diego Gualtierotti. Para cualquier consulta relacionada con la protección de datos puedes escribir a diego.gualtierotti@gmail.com.'
        ]
      },
      {
        id: 'data-purpose',
        title: 'Datos tratados y finalidades',
        paragraphs: [
          'Durante la navegación se recopilan automáticamente datos técnicos (dirección IP anonimizada, información del navegador, registros de navegación) necesarios para el funcionamiento seguro del sitio.',
          'Cuando completas el formulario de contacto se tratan tu nombre, correo electrónico y mensaje para responder a tu solicitud.'
        ],
        list: [
          'Proporcionar el sitio web y supervisar su correcto funcionamiento',
          'Responder a los mensajes recibidos a través del formulario de contacto',
          'Analizar el tráfico agregado y anonimizado para mejorar el contenido'
        ]
      },
      {
        id: 'legal-basis',
        title: 'Base jurídica',
        paragraphs: [
          'Los datos técnicos se tratan sobre la base del interés legítimo del responsable en mantener el sitio seguro y operativo (art. 6.1.f RGPD).',
          'La información enviada mediante el formulario se procesa para adoptar medidas precontractuales a petición del interesado (art. 6.1.b RGPD).',
          'Las cookies analíticas de terceros solo se activan tras obtener tu consentimiento expreso (art. 6.1.a RGPD).'
        ]
      },
      {
        id: 'retention',
        title: 'Plazos de conservación',
        paragraphs: [
          'Los registros técnicos anonimizados utilizados para la seguridad se conservan durante un máximo de 12 meses.',
          'Los mensajes recibidos mediante el formulario se conservan durante el tiempo necesario para gestionar la solicitud y, en cualquier caso, no más de 24 meses.',
          'El registro de tu consentimiento sobre cookies se mantiene durante 12 meses, tras los cuales se te solicitará una nueva elección.'
        ]
      },
      {
        id: 'data-subject-rights',
        title: 'Derechos de los interesados',
        paragraphs: [
          'Puedes solicitar el acceso a tus datos personales, su rectificación, supresión o la limitación del tratamiento, así como oponerte al tratamiento en los casos previstos.',
          'También puedes retirar en cualquier momento el consentimiento otorgado sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo.',
          'Para ejercer tus derechos escribe a diego.gualtierotti@gmail.com. Asimismo, puedes presentar una reclamación ante tu autoridad de control competente.'
        ]
      },
      {
        id: 'cookies',
        title: 'Cookies y tecnologías similares',
        paragraphs: [
          'El sitio utiliza cookies técnicas estrictamente necesarias y cookies analíticas anonimizadas. Las cookies analíticas (Google Analytics) solo se activan tras tu consentimiento mediante el banner de preferencias.',
          'Puedes cambiar o revocar tus preferencias de cookies en cualquier momento a través del botón "Gestionar cookies" del pie de página o volviendo a abrir el banner.'
        ]
      },
      {
        id: 'third-parties',
        title: 'Proveedores terceros',
        paragraphs: [
          'Google Analytics (Google Ireland Limited) se emplea para recopilar estadísticas agregadas de uso del sitio. Las direcciones IP se anonimizarán y los datos se conservarán durante 14 meses. La información puede transferirse a Estados Unidos sobre la base de las Cláusulas Contractuales Tipo.',
          'Formspree (Formspree, Inc.) es el proveedor que entrega los mensajes del formulario de contacto. Los datos se procesan únicamente para remitir tu solicitud y están sujetos a la política de privacidad de Formspree.'
        ]
      },
      {
        id: 'transfers',
        title: 'Transferencias internacionales',
        paragraphs: [
          'Cuando los servicios sean prestados por entidades ubicadas fuera del Espacio Económico Europeo, las transferencias se basan en garantías adecuadas, como las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea.'
        ]
      },
      {
        id: 'changes',
        title: 'Cambios en esta política',
        paragraphs: [
          'Esta política puede actualizarse para reflejar cambios normativos o mejoras en los servicios ofrecidos. Cualquier modificación relevante se comunicará a través del sitio web.'
        ]
      }
    ]
  }
};

export const TERMS_CONTENT: LegalDocumentMap = {
  it: {
    title: 'Termini e Condizioni d’uso',
    lastUpdated: 'Aggiornati il 17 novembre 2024',
    intro: [
      'L’accesso e l’utilizzo di questo portfolio implicano l’accettazione dei presenti Termini e Condizioni. Ti invitiamo a leggerli con attenzione prima di proseguire nella navigazione.'
    ],
    sections: [
      {
        id: 'scope',
        title: 'Oggetto del servizio',
        paragraphs: [
          'Il sito ha finalità puramente informativa e presenta progetti, competenze e recapiti professionali del titolare. Non costituisce offerta commerciale vincolante.'
        ]
      },
      {
        id: 'use',
        title: 'Modalità di utilizzo',
        paragraphs: [
          'L’utente si impegna a utilizzare il sito in modo lecito, rispettoso dei diritti altrui e senza compromettere la disponibilità o la sicurezza dell’infrastruttura.',
          'È vietato introdurre o distribuire malware, tentare accessi non autorizzati o utilizzare le informazioni presenti per attività fraudolente.'
        ]
      },
      {
        id: 'intellectual-property',
        title: 'Proprietà intellettuale',
        paragraphs: [
          'Salvo diversa indicazione, i contenuti testuali, grafici e multimediali sono di proprietà del titolare o concessi in licenza. Ne è vietata la riproduzione senza autorizzazione.',
          'È consentito condividere i contenuti citando la fonte e senza alterarne il significato.'
        ]
      },
      {
        id: 'third-party-services',
        title: 'Servizi di terzi',
        paragraphs: [
          'Il sito integra servizi di terze parti come Google Analytics e Formspree. L’utilizzo di tali servizi è disciplinato dai rispettivi termini e informative.'
        ]
      },
      {
        id: 'privacy',
        title: 'Tutela dei dati personali',
        paragraphs: [
          'Il trattamento dei dati avviene secondo quanto descritto nell’Informativa sulla Privacy, parte integrante dei presenti Termini. Proseguendo nella navigazione dichiari di averla letta e compresa.'
        ]
      },
      {
        id: 'liability',
        title: 'Limitazione di responsabilità',
        paragraphs: [
          'Pur adottando misure ragionevoli di sicurezza, non è garantita l’assenza di interruzioni, errori o virus. L’uso del sito avviene sotto esclusiva responsabilità dell’utente.',
          'Il titolare non risponde di eventuali danni derivanti da un uso improprio delle informazioni pubblicate o da malfunzionamenti indipendenti dalla propria volontà.'
        ]
      },
      {
        id: 'changes',
        title: 'Modifiche ai Termini',
        paragraphs: [
          'I Termini possono essere aggiornati in qualsiasi momento. La versione più recente è sempre disponibile in questa pagina e si applica dal momento della pubblicazione.'
        ]
      },
      {
        id: 'law',
        title: 'Legge applicabile e foro competente',
        paragraphs: [
          'I presenti Termini sono disciplinati dalla legge italiana. Per ogni controversia è competente in via esclusiva il Foro di Milano, fatto salvo quanto previsto dalla normativa a tutela dei consumatori.'
        ]
      }
    ]
  },
  en: {
    title: 'Terms of Use',
    lastUpdated: 'Updated on 17 November 2024',
    intro: [
      'By accessing this portfolio you agree to the following Terms of Use. Please read them carefully before continuing to browse.'
    ],
    sections: [
      {
        id: 'scope',
        title: 'Service scope',
        paragraphs: [
          'The website is provided for information purposes only and showcases the owner’s projects, skills and professional contacts. It does not constitute a binding commercial offer.'
        ]
      },
      {
        id: 'use',
        title: 'Acceptable use',
        paragraphs: [
          'Users agree to use the website lawfully, respect the rights of others and avoid any action that could jeopardise the availability or security of the infrastructure.',
          'Introducing or distributing malware, attempting unauthorised access or using the information for fraudulent purposes is forbidden.'
        ]
      },
      {
        id: 'intellectual-property',
        title: 'Intellectual property',
        paragraphs: [
          'Unless otherwise specified, textual, graphic and multimedia content is owned by the site owner or licensed to them. Reproducing such content without permission is prohibited.',
          'Sharing content is allowed provided that the source is credited and the meaning is not altered.'
        ]
      },
      {
        id: 'third-party-services',
        title: 'Third-party services',
        paragraphs: [
          'The website integrates third-party tools such as Google Analytics and Formspree. Their use is governed by the respective terms and privacy notices.'
        ]
      },
      {
        id: 'privacy',
        title: 'Data protection',
        paragraphs: [
          'Personal data is processed as described in the Privacy Policy, which forms an integral part of these Terms. By continuing to browse you confirm that you have read and understood it.'
        ]
      },
      {
        id: 'liability',
        title: 'Limitation of liability',
        paragraphs: [
          'Reasonable security measures are adopted, yet uninterrupted, error-free or virus-free operation cannot be guaranteed. You use the site at your own risk.',
          'The owner is not liable for damages resulting from improper use of the information provided or from malfunctions beyond their control.'
        ]
      },
      {
        id: 'changes',
        title: 'Changes to the Terms',
        paragraphs: [
          'These Terms may be updated at any time. The most recent version is always available on this page and applies from the moment it is published.'
        ]
      },
      {
        id: 'law',
        title: 'Governing law and jurisdiction',
        paragraphs: [
          'These Terms are governed by Italian law. Any dispute shall fall under the exclusive jurisdiction of the Court of Milan, without prejudice to mandatory consumer protection rules.'
        ]
      }
    ]
  },
  de: {
    title: 'Nutzungsbedingungen',
    lastUpdated: 'Aktualisiert am 17. November 2024',
    intro: [
      'Durch den Zugriff auf dieses Portfolio erklärst du dich mit den folgenden Nutzungsbedingungen einverstanden. Bitte lies sie sorgfältig, bevor du fortfährst.'
    ],
    sections: [
      {
        id: 'scope',
        title: 'Leistungsumfang',
        paragraphs: [
          'Die Website dient ausschließlich Informationszwecken und präsentiert Projekte, Fähigkeiten und berufliche Kontaktdaten des Betreibers. Sie stellt kein verbindliches Angebot dar.'
        ]
      },
      {
        id: 'use',
        title: 'Zulässige Nutzung',
        paragraphs: [
          'Nutzer verpflichten sich zu einem rechtmäßigen Gebrauch der Website, zur Wahrung der Rechte Dritter und dazu, keine Handlungen vorzunehmen, welche die Verfügbarkeit oder Sicherheit der Infrastruktur gefährden.',
          'Es ist untersagt, Schadsoftware einzuschleusen oder zu verbreiten, unbefugte Zugriffe zu versuchen oder die Informationen für betrügerische Zwecke zu verwenden.'
        ]
      },
      {
        id: 'intellectual-property',
        title: 'Geistiges Eigentum',
        paragraphs: [
          'Sofern nicht anders angegeben, stehen Texte, Grafiken und Multimedia-Inhalte im Eigentum des Betreibers oder werden unter Lizenz genutzt. Eine Vervielfältigung ohne Genehmigung ist nicht gestattet.',
          'Das Teilen von Inhalten ist erlaubt, sofern die Quelle genannt und der Sinn nicht verfälscht wird.'
        ]
      },
      {
        id: 'third-party-services',
        title: 'Dienste Dritter',
        paragraphs: [
          'Die Website bindet Dienste Dritter wie Google Analytics und Formspree ein. Deren Nutzung unterliegt den jeweiligen Bedingungen und Datenschutzhinweisen.'
        ]
      },
      {
        id: 'privacy',
        title: 'Datenschutz',
        paragraphs: [
          'Die Verarbeitung personenbezogener Daten erfolgt gemäß der Datenschutzerklärung, die Bestandteil dieser Nutzungsbedingungen ist. Durch die weitere Nutzung bestätigst du, sie gelesen und verstanden zu haben.'
        ]
      },
      {
        id: 'liability',
        title: 'Haftungsbeschränkung',
        paragraphs: [
          'Es werden angemessene Sicherheitsmaßnahmen ergriffen, dennoch kann ein störungsfreier, fehlerfreier oder virenfreier Betrieb nicht garantiert werden. Die Nutzung erfolgt auf eigenes Risiko.',
          'Der Betreiber haftet nicht für Schäden, die aus einer unsachgemäßen Verwendung der bereitgestellten Informationen oder aus Störungen entstehen, die außerhalb seines Einflussbereichs liegen.'
        ]
      },
      {
        id: 'changes',
        title: 'Änderungen der Bedingungen',
        paragraphs: [
          'Die Bedingungen können jederzeit aktualisiert werden. Die jeweils aktuelle Version ist auf dieser Seite verfügbar und gilt ab dem Zeitpunkt der Veröffentlichung.'
        ]
      },
      {
        id: 'law',
        title: 'Anwendbares Recht und Gerichtsstand',
        paragraphs: [
          'Diese Bedingungen unterliegen italienischem Recht. Für Streitigkeiten ist ausschließlich das Gericht Mailand zuständig, vorbehaltlich zwingender Verbraucherschutzvorschriften.'
        ]
      }
    ]
  },
  es: {
    title: 'Términos de Uso',
    lastUpdated: 'Actualizados el 17 de noviembre de 2024',
    intro: [
      'Al acceder a este portafolio aceptas los siguientes Términos de Uso. Te invitamos a leerlos detenidamente antes de continuar.'
    ],
    sections: [
      {
        id: 'scope',
        title: 'Alcance del servicio',
        paragraphs: [
          'El sitio tiene fines exclusivamente informativos y presenta los proyectos, competencias y datos profesionales del titular. No constituye una oferta comercial vinculante.'
        ]
      },
      {
        id: 'use',
        title: 'Uso permitido',
        paragraphs: [
          'El usuario se compromete a utilizar el sitio de forma lícita, respetando los derechos de terceros y sin comprometer la disponibilidad o seguridad de la infraestructura.',
          'Está prohibido introducir o difundir malware, intentar accesos no autorizados o emplear la información con fines fraudulentos.'
        ]
      },
      {
        id: 'intellectual-property',
        title: 'Propiedad intelectual',
        paragraphs: [
          'Salvo indicación contraria, los contenidos textuales, gráficos y multimedia pertenecen al titular o se utilizan bajo licencia. Su reproducción sin autorización está prohibida.',
          'Se permite compartir los contenidos citando la fuente y sin alterar su significado.'
        ]
      },
      {
        id: 'third-party-services',
        title: 'Servicios de terceros',
        paragraphs: [
          'El sitio integra servicios de terceros como Google Analytics y Formspree. El uso de dichos servicios se rige por sus respectivas condiciones e informaciones de privacidad.'
        ]
      },
      {
        id: 'privacy',
        title: 'Protección de datos',
        paragraphs: [
          'Los datos personales se tratan según lo descrito en la Política de Privacidad, que forma parte integrante de estos Términos. Al continuar navegando confirmas que la has leído y comprendido.'
        ]
      },
      {
        id: 'liability',
        title: 'Limitación de responsabilidad',
        paragraphs: [
          'Aunque se adoptan medidas de seguridad razonables, no se garantiza un funcionamiento ininterrumpido, sin errores o libre de virus. Utilizas el sitio bajo tu propia responsabilidad.',
          'El titular no se hace responsable de los daños derivados de un uso inadecuado de la información publicada o de fallos ajenos a su control.'
        ]
      },
      {
        id: 'changes',
        title: 'Modificación de los Términos',
        paragraphs: [
          'Los Términos pueden actualizarse en cualquier momento. La versión más reciente está siempre disponible en esta página y se aplica desde el momento de su publicación.'
        ]
      },
      {
        id: 'law',
        title: 'Ley aplicable y jurisdicción',
        paragraphs: [
          'Estos Términos se rigen por la legislación italiana. Para cualquier controversia serán competentes los tribunales de Milán, sin perjuicio de las normas imperativas de protección al consumidor.'
        ]
      }
    ]
  }
};
