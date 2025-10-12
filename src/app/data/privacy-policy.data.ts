import { LegalContentDictionary } from '../models/legal-content.model';

export const privacyPolicyContent: LegalContentDictionary = {
  it: {
    title: 'Privacy Policy',
    lastUpdatedLabel: 'Ultimo aggiornamento: 10 marzo 2024',
    intro: [
      'Questa informativa descrive come vengono trattati i dati personali raccolti attraverso il portfolio online di Diego, accessibile all\'indirizzo indicato nella pagina principale.',
      'Il trattamento dei dati avviene nel rispetto del Regolamento (UE) 2016/679 (GDPR) e della normativa italiana applicabile. Visitando il sito e utilizzando i moduli di contatto accetti le condizioni descritte di seguito.'
    ],
    sections: [
      {
        id: 'controller',
        title: 'Titolare del trattamento',
        paragraphs: [
          'Titolare del trattamento è Diego, contattabile all\'indirizzo email fornito nella sezione Contatti del sito. Per qualsiasi richiesta relativa alla privacy puoi scrivere direttamente all\'indirizzo indicato.'
        ]
      },
      {
        id: 'data-collected',
        title: 'Categorie di dati trattati',
        paragraphs: [
          'Il sito raccoglie dati di navigazione in forma pseudonimizzata (indirizzo IP mascherato, informazioni sul browser e sul dispositivo) tramite cookie analitici facoltativi.',
          'Attraverso il modulo di contatto vengono raccolti nome, indirizzo email, eventuale azienda di appartenenza e contenuto del messaggio inviato dall\'utente.'
        ]
      },
      {
        id: 'purposes',
        title: 'Finalità, basi giuridiche e tempi di conservazione',
        description: 'Il trattamento dei dati personali si fonda sulle seguenti finalità:',
        bulletPoints: [
          'Rispondere alle richieste inviate tramite il modulo di contatto (Formspree) – Base giuridica: consenso espresso dall\'interessato (art. 6.1.a GDPR). I dati sono conservati per il tempo necessario a gestire la richiesta e comunque non oltre 12 mesi dall\'ultimo contatto.',
          'Monitorare statistiche aggregate sull\'utilizzo del sito (Google Analytics con IP anonimizzato) – Base giuridica: consenso espresso tramite banner cookie (art. 6.1.a GDPR). I dati vengono conservati da Google per 14 mesi secondo le impostazioni dell\'account Analytics.',
          'Garantire la sicurezza del sito e prevenire utilizzi fraudolenti – Base giuridica: legittimo interesse del titolare (art. 6.1.f GDPR). I log tecnici vengono conservati per 6 mesi salvo obblighi di legge o necessità di difesa in giudizio.'
        ]
      },
      {
        id: 'third-parties',
        title: 'Fornitori terzi',
        paragraphs: [
          'Google Analytics (Google LLC) è utilizzato in modalità con IP anonimizzato per raccogliere statistiche aggregate. Il servizio viene caricato solo dopo il rilascio del consenso tramite il banner cookie. Puoi consultare l\'informativa completa su https://policies.google.com/privacy.',
          'Formspree Inc. fornisce la piattaforma che instrada i messaggi del modulo di contatto verso l\'indirizzo email del titolare. I dati sono conservati da Formspree per il tempo necessario a fornire il servizio. Maggiori informazioni su https://formspree.io/legal/privacy-policy.'
        ]
      },
      {
        id: 'rights',
        title: 'Diritti dell\'interessato',
        description: 'In qualsiasi momento l\'interessato può esercitare i diritti previsti dagli articoli 15-22 del GDPR:',
        bulletPoints: [
          'Accesso ai dati personali e alle informazioni sul trattamento;',
          'Rettifica dei dati inesatti o integrazione di quelli incompleti;',
          'Cancellazione dei dati (“diritto all\'oblio”) nei casi previsti dalla legge;',
          'Limitazione del trattamento al ricorrere delle condizioni di cui all\'art. 18 GDPR;',
          'Opposizione al trattamento basato sul legittimo interesse;',
          'Portabilità dei dati forniti volontariamente in un formato strutturato;',
          'Revoca del consenso prestato in qualsiasi momento, senza pregiudicare la liceità del trattamento antecedente alla revoca.'
        ]
      },
      {
        id: 'exercise-rights',
        title: 'Esercizio dei diritti',
        paragraphs: [
          'Per esercitare i tuoi diritti puoi inviare una richiesta all\'indirizzo email indicato nella pagina Contatti, specificando l\'oggetto della richiesta e allegando un documento che consenta la verifica della tua identità. Riceverai riscontro entro 30 giorni dal ricevimento.'
        ]
      },
      {
        id: 'cookies',
        title: 'Cookie e gestione del consenso',
        paragraphs: [
          'Il sito utilizza esclusivamente cookie tecnici necessari e cookie analitici facoltativi. Questi ultimi vengono installati solo se presti consenso tramite il banner dedicato; la tua scelta viene salvata in un cookie tecnico e nel localStorage per essere rispettata a ogni visita.',
          'Puoi modificare in qualsiasi momento la scelta fatta cliccando su “Gestisci preferenze cookie” nel footer oppure riaprendo il banner. In caso di revoca del consenso, Google Analytics viene immediatamente disattivato.'
        ]
      },
      {
        id: 'updates',
        title: 'Aggiornamenti dell\'informativa',
        paragraphs: [
          'Il titolare si riserva il diritto di aggiornare periodicamente la presente informativa. Le modifiche sostanziali verranno comunicate attraverso il sito e avranno effetto dalla data di pubblicazione.'
        ]
      }
    ]
  },
  en: {
    title: 'Privacy Policy',
    lastUpdatedLabel: 'Last update: 10 March 2024',
    intro: [
      'This notice explains how personal data collected through Diego\'s online portfolio are processed.',
      'Processing is carried out in compliance with Regulation (EU) 2016/679 (GDPR) and applicable Italian law. By browsing the website and using the contact form you agree to the conditions described below.'
    ],
    sections: [
      {
        id: 'controller',
        title: 'Data controller',
        paragraphs: [
          'The data controller is Diego, who can be reached via the email address published in the Contact section of the website. All privacy-related requests can be submitted using that channel.'
        ]
      },
      {
        id: 'data-collected',
        title: 'Categories of data processed',
        paragraphs: [
          'The website collects pseudonymised browsing data (masked IP address, browser and device information) through optional analytics cookies.',
          'When the contact form is used we collect your name, email address, company (if provided) and the content of the message you send.'
        ]
      },
      {
        id: 'purposes',
        title: 'Purposes, legal bases and retention',
        description: 'Personal data are processed for the following purposes:',
        bulletPoints: [
          'Replying to enquiries submitted via the contact form (Formspree) – Legal basis: explicit consent of the data subject (Art. 6.1.a GDPR). Data are stored for the time required to manage the request and no longer than 12 months after the last contact.',
          'Measuring aggregated website statistics (Google Analytics with anonymised IP) – Legal basis: consent provided through the cookie banner (Art. 6.1.a GDPR). Data are retained by Google for 14 months according to the Analytics account settings.',
          'Ensuring website security and preventing abusive use – Legal basis: legitimate interest of the controller (Art. 6.1.f GDPR). Technical logs are kept for 6 months unless longer storage is required by law or for legal defence.'
        ]
      },
      {
        id: 'third-parties',
        title: 'Third-party providers',
        paragraphs: [
          'Google Analytics (Google LLC) is used in anonymised IP mode to collect aggregated statistics. The service is loaded only after consent is given through the cookie banner. You can read the full notice at https://policies.google.com/privacy.',
          'Formspree Inc. processes the messages submitted through the contact form and forwards them to the controller\'s email inbox. Data are stored by Formspree for the time needed to deliver the service. More information at https://formspree.io/legal/privacy-policy.'
        ]
      },
      {
        id: 'rights',
        title: 'Data subject rights',
        description: 'Data subjects may exercise the rights provided by Articles 15-22 GDPR at any time:',
        bulletPoints: [
          'Access their personal data and receive information about processing;',
          'Rectify inaccurate or incomplete data;',
          'Request erasure of data (“right to be forgotten”) where applicable;',
          'Restrict processing under the conditions set out in Article 18 GDPR;',
          'Object to processing based on legitimate interest;',
          'Receive the data provided voluntarily in a structured, commonly used format (data portability);',
          'Withdraw consent at any time without affecting the lawfulness of processing based on consent before its withdrawal.'
        ]
      },
      {
        id: 'exercise-rights',
        title: 'How to exercise rights',
        paragraphs: [
          'Requests can be sent to the email address listed in the Contact section. Please specify the right you wish to exercise and provide information that allows us to verify your identity. A reply will be sent within 30 days from receipt.'
        ]
      },
      {
        id: 'cookies',
        title: 'Cookies and consent management',
        paragraphs: [
          'The website uses strictly necessary cookies and optional analytics cookies. Analytics cookies are installed only after you grant consent through the banner; your choice is stored in a technical cookie and in localStorage so that it is honoured on future visits.',
          'You can change your preference at any time by clicking “Manage cookie preferences” in the footer or by reopening the banner. If consent is withdrawn, Google Analytics is immediately disabled.'
        ]
      },
      {
        id: 'updates',
        title: 'Updates',
        paragraphs: [
          'The controller may update this notice from time to time. Material changes will be communicated via the website and will take effect from the date of publication.'
        ]
      }
    ]
  },
  de: {
    title: 'Datenschutzerklärung',
    lastUpdatedLabel: 'Letzte Aktualisierung: 10. März 2024',
    intro: [
      'Diese Hinweise erläutern, wie personenbezogene Daten über Diegos Online-Portfolio verarbeitet werden.',
      'Die Verarbeitung erfolgt im Einklang mit der Datenschutz-Grundverordnung (DSGVO) und dem anwendbaren italienischen Recht. Durch den Besuch der Website und die Nutzung des Kontaktformulars erklärst du dich mit den nachstehenden Bedingungen einverstanden.'
    ],
    sections: [
      {
        id: 'controller',
        title: 'Verantwortlicher',
        paragraphs: [
          'Verantwortlich für die Datenverarbeitung ist Diego. Er ist über die in der Kontaktsektion der Website angegebene E-Mail-Adresse erreichbar. Datenschutzanfragen können über diesen Kanal gestellt werden.'
        ]
      },
      {
        id: 'data-collected',
        title: 'Verarbeitete Datenkategorien',
        paragraphs: [
          'Die Website erhebt pseudonymisierte Nutzungsdaten (anonymisierte IP-Adresse, Browser- und Geräteinformationen) über optionale Analyse-Cookies.',
          'Bei Verwendung des Kontaktformulars werden Name, E-Mail-Adresse, ggf. Unternehmen sowie der Inhalt der Nachricht verarbeitet.'
        ]
      },
      {
        id: 'purposes',
        title: 'Zwecke, Rechtsgrundlagen und Aufbewahrung',
        description: 'Personenbezogene Daten werden zu folgenden Zwecken verarbeitet:',
        bulletPoints: [
          'Beantwortung von Anfragen über das Kontaktformular (Formspree) – Rechtsgrundlage: ausdrückliche Einwilligung der betroffenen Person (Art. 6 Abs. 1 lit. a DSGVO). Die Daten werden so lange gespeichert, wie dies zur Bearbeitung der Anfrage erforderlich ist, höchstens jedoch 12 Monate nach dem letzten Kontakt.',
          'Erstellung aggregierter Nutzungsstatistiken (Google Analytics mit anonymisierter IP) – Rechtsgrundlage: Einwilligung über das Cookie-Banner (Art. 6 Abs. 1 lit. a DSGVO). Die Daten werden von Google entsprechend den Analytics-Einstellungen für 14 Monate aufbewahrt.',
          'Gewährleistung der Sicherheit der Website und Vermeidung missbräuchlicher Nutzung – Rechtsgrundlage: berechtigtes Interesse des Verantwortlichen (Art. 6 Abs. 1 lit. f DSGVO). Technische Protokolle werden für 6 Monate gespeichert, sofern keine längere Aufbewahrung gesetzlich vorgeschrieben oder zur Rechtsverteidigung erforderlich ist.'
        ]
      },
      {
        id: 'third-parties',
        title: 'Dienstleister',
        paragraphs: [
          'Google Analytics (Google LLC) wird im Modus mit anonymisierter IP eingesetzt, um aggregierte Statistiken zu erhalten. Der Dienst wird erst nach Erteilung der Einwilligung über das Cookie-Banner geladen. Die vollständige Datenschutzerklärung findest du unter https://policies.google.com/privacy.',
          'Formspree Inc. leitet die über das Kontaktformular übermittelten Nachrichten an das E-Mail-Postfach des Verantwortlichen weiter. Die Daten werden von Formspree so lange gespeichert, wie es für die Bereitstellung des Dienstes notwendig ist. Weitere Informationen unter https://formspree.io/legal/privacy-policy.'
        ]
      },
      {
        id: 'rights',
        title: 'Rechte der betroffenen Personen',
        description: 'Betroffene Personen können jederzeit die in den Artikeln 15-22 DSGVO vorgesehenen Rechte ausüben:',
        bulletPoints: [
          'Auskunft über ihre personenbezogenen Daten und Informationen zur Verarbeitung erhalten;',
          'Unrichtige oder unvollständige Daten berichtigen lassen;',
          'Löschung der Daten verlangen (“Recht auf Vergessenwerden”), soweit gesetzlich vorgesehen;',
          'Einschränkung der Verarbeitung unter den Voraussetzungen des Art. 18 DSGVO verlangen;',
          'Widerspruch gegen eine auf berechtigtem Interesse beruhende Verarbeitung einlegen;',
          'Die bereitgestellten Daten in einem strukturierten, gängigen Format erhalten (Datenübertragbarkeit);',
          'Eine erteilte Einwilligung jederzeit widerrufen, ohne dass dies die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung berührt.'
        ]
      },
      {
        id: 'exercise-rights',
        title: 'Ausübung der Rechte',
        paragraphs: [
          'Richte deine Anfrage an die in der Kontaktsektion angegebene E-Mail-Adresse und gib an, welches Recht du ausüben möchtest. Bitte füge Informationen bei, die deine Identität bestätigen. Eine Antwort erfolgt innerhalb von 30 Tagen nach Eingang.'
        ]
      },
      {
        id: 'cookies',
        title: 'Cookies und Einwilligungsverwaltung',
        paragraphs: [
          'Die Website verwendet nur unbedingt erforderliche Cookies sowie optionale Analyse-Cookies. Analyse-Cookies werden ausschließlich nach deiner Einwilligung über das Banner gesetzt; deine Entscheidung wird in einem technischen Cookie und im localStorage gespeichert und bei jedem Besuch berücksichtigt.',
          'Du kannst deine Wahl jederzeit über “Cookie-Einstellungen verwalten” im Footer oder durch erneutes Öffnen des Banners ändern. Bei Widerruf der Einwilligung wird Google Analytics sofort deaktiviert.'
        ]
      },
      {
        id: 'updates',
        title: 'Aktualisierungen',
        paragraphs: [
          'Der Verantwortliche behält sich vor, diese Datenschutzerklärung zu aktualisieren. Wesentliche Änderungen werden über die Website bekannt gegeben und gelten ab dem Veröffentlichungsdatum.'
        ]
      }
    ]
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdatedLabel: 'Última actualización: 10 de marzo de 2024',
    intro: [
      'Este aviso describe cómo se tratan los datos personales recopilados a través del portafolio en línea de Diego.',
      'El tratamiento se realiza de conformidad con el Reglamento (UE) 2016/679 (RGPD) y la legislación italiana aplicable. Al navegar por el sitio y utilizar el formulario de contacto aceptas las condiciones descritas a continuación.'
    ],
    sections: [
      {
        id: 'controller',
        title: 'Responsable del tratamiento',
        paragraphs: [
          'El responsable del tratamiento es Diego, disponible a través del correo electrónico indicado en la sección de Contacto del sitio web. Cualquier solicitud relacionada con la privacidad puede enviarse a esa dirección.'
        ]
      },
      {
        id: 'data-collected',
        title: 'Categorías de datos tratados',
        paragraphs: [
          'El sitio recopila datos de navegación seudonimizados (dirección IP enmascarada, información del navegador y del dispositivo) mediante cookies analíticas opcionales.',
          'Cuando se utiliza el formulario de contacto se recogen el nombre, la dirección de correo electrónico, la empresa (si se indica) y el contenido del mensaje enviado.'
        ]
      },
      {
        id: 'purposes',
        title: 'Finalidades, bases jurídicas y conservación',
        description: 'Los datos personales se tratan con las siguientes finalidades:',
        bulletPoints: [
          'Responder a las solicitudes enviadas a través del formulario de contacto (Formspree) – Base jurídica: consentimiento explícito del interesado (art. 6.1.a RGPD). Los datos se conservan durante el tiempo necesario para gestionar la solicitud y, en todo caso, no más de 12 meses desde el último contacto.',
          'Medir estadísticas agregadas de uso del sitio (Google Analytics con IP anonimizada) – Base jurídica: consentimiento otorgado mediante el banner de cookies (art. 6.1.a RGPD). Google conserva los datos durante 14 meses según la configuración de la cuenta de Analytics.',
          'Garantizar la seguridad del sitio y prevenir usos indebidos – Base jurídica: interés legítimo del responsable (art. 6.1.f RGPD). Los registros técnicos se conservan durante 6 meses salvo obligaciones legales o necesidades de defensa en juicio.'
        ]
      },
      {
        id: 'third-parties',
        title: 'Proveedores externos',
        paragraphs: [
          'Google Analytics (Google LLC) se utiliza en modo de IP anonimizada para recoger estadísticas agregadas. El servicio solo se carga tras otorgar el consentimiento mediante el banner de cookies. Consulta el aviso completo en https://policies.google.com/privacy.',
          'Formspree Inc. gestiona los mensajes enviados mediante el formulario de contacto y los reenvía al buzón del responsable. Los datos se conservan por el tiempo necesario para prestar el servicio. Más información en https://formspree.io/legal/privacy-policy.'
        ]
      },
      {
        id: 'rights',
        title: 'Derechos de los interesados',
        description: 'Los interesados pueden ejercer en cualquier momento los derechos previstos en los artículos 15-22 del RGPD:',
        bulletPoints: [
          'Acceder a sus datos personales y obtener información sobre el tratamiento;',
          'Rectificar los datos inexactos o incompletos;',
          'Solicitar la supresión de los datos (“derecho al olvido”) en los casos previstos;',
          'Limitar el tratamiento cuando se den las condiciones del art. 18 RGPD;',
          'Oponerse al tratamiento basado en el interés legítimo;',
          'Recibir los datos facilitados voluntariamente en un formato estructurado y de uso común (portabilidad);',
          'Retirar el consentimiento en cualquier momento sin afectar a la licitud del tratamiento realizado antes de la retirada.'
        ]
      },
      {
        id: 'exercise-rights',
        title: 'Ejercicio de los derechos',
        paragraphs: [
          'Puedes enviar tus solicitudes a la dirección de correo indicada en la sección de Contacto, especificando el derecho que deseas ejercer y aportando información que permita verificar tu identidad. La respuesta se facilitará en un plazo de 30 días desde la recepción.'
        ]
      },
      {
        id: 'cookies',
        title: 'Cookies y gestión del consentimiento',
        paragraphs: [
          'El sitio utiliza únicamente cookies técnicas necesarias y cookies analíticas opcionales. Estas últimas se instalan solo si otorgas tu consentimiento mediante el banner; tu elección se almacena en una cookie técnica y en el almacenamiento local para respetarla en futuras visitas.',
          'Puedes modificar tu elección en cualquier momento haciendo clic en “Gestionar preferencias de cookies” en el pie de página o reabriendo el banner. Si revocas el consentimiento, Google Analytics se desactiva inmediatamente.'
        ]
      },
      {
        id: 'updates',
        title: 'Actualizaciones',
        paragraphs: [
          'El responsable podrá actualizar la presente política. Los cambios relevantes se comunicarán a través del sitio web y serán efectivos desde la fecha de publicación.'
        ]
      }
    ]
  }
};
