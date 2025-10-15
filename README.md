# Portfolio

## Index

| Language | Sections |
| --- | --- |
| [English](#english) | [Overview](#overview) · [Project Structure](#project-structure) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started) · [Scripts](#scripts) · [Server-side Rendering](#server-side-rendering) · [Deployments](#deployments) · [License](#license) |
| [Italiano](#italiano) | [Panoramica](#panoramica) · [Struttura del progetto](#struttura-del-progetto) · [Tecnologie](#tecnologie) · [Avvio del progetto](#avvio-del-progetto) · [Script](#script) · [Rendering lato server](#rendering-lato-server) · [Deployment](#deployment) · [Licenza](#licenza) |
| [Deutsch](#deutsch) | [Überblick](#überblick) · [Projektstruktur](#projektstruktur) · [Technologie-Stack](#technologie-stack) · [Erste Schritte](#erste-schritte) · [Skripte](#skripte) · [Serverseitiges Rendern](#serverseitiges-rendern) · [Bereitstellungen](#bereitstellungen) · [Lizenz](#lizenz) |
| [Español](#español) | [Descripción general](#descripción-general) · [Estructura del proyecto](#estructura-del-proyecto) · [Tecnologías](#tecnologías) · [Primeros pasos](#primeros-pasos) · [Scripts disponibles](#scripts-disponibles) · [Renderizado del lado del servidor](#renderizado-del-lado-del-servidor) · [Despliegues](#despliegues) · [Licencia](#licencia) |

## Community

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)

## Community

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)

## English

### Overview
This repository contains a portfolio application built with **Angular 18**. It uses **Express** to provide server-side rendering (SSR) and supports both English and Italian content. Each page section (hero, about me, projects, skills, education, experiences, statistics and contact form) is implemented as a standalone component.

### Project Structure
> The following structure is shared across all language sections.

```
.
├── server.ts                 # Express server for SSR
├── src/
│   ├── main.ts               # Client bootstrap
│   ├── main.server.ts        # Server bootstrap
│   ├── app/
│   │   ├── components/       # Standalone UI components
│   │   ├── pages/            # Page-level components
│   │   ├── services/         # Utilities (translation, email...)
│   │   ├── data/             # Multilingual data files
│   │   └── dtos/             # TypeScript interfaces
│   └── styles/               # Global SCSS
└── angular.json              # Angular CLI configuration
```

### Tech Stack
- **Framework:** Angular 18
- **SSR:** Express
- **Language:** TypeScript
- **Styling:** SCSS
- **Tooling:** npm, Angular CLI

### Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
   If the installation fails with a `403 Forbidden` error caused by a proxy configuration,
   clear the inherited npm proxy variables and retry:
   ```bash
   unset npm_config_http_proxy
   unset npm_config_https_proxy
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   Open `http://localhost:4200` to view the app. The browser reloads on file changes.
3. Run tests:
   ```bash
   npm test
   ```

### Environment configuration
Analytics, the contact form and error tracking are configured through the Angular environment files under [`src/environments/`](src/environments/).
Update the following keys before publishing:

- `gaTrackingId` – Google Analytics 4 tracking code (the GA measurement ID is public and ships with the client bundle).
- `formspreeEndpoint` – Formspree project endpoint used by `EmailService` (it is also public because it must be reachable from the browser).
- `enableAnalytics` / `enableErrorTracking` – Toggle for loading the external scripts.
- `sentryDsn` and `sentryTracesSampleRate` – Sentry credentials and sampling rate.

Keep the production file (`environment.prod.ts`) free from private secrets. Both identifiers are safe to expose, but you can keep the real production values outside of git by generating the file during the build. Run `npm run configure:env:prod` locally or in CI to write the production configuration from environment variables:

```yaml
- name: Write production environment file
  run: npm run configure:env:prod
  env:
    NG_APP_GA_TRACKING_ID: ${{ secrets.GA_TRACKING_ID }}
    NG_APP_FORMSPREE_ENDPOINT: ${{ secrets.FORMSPREE_ENDPOINT }}
    NG_APP_ENABLE_ANALYTICS: 'true'
    NG_APP_ENABLE_ERROR_TRACKING: 'true'
    NG_APP_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
    NG_APP_SENTRY_TRACES_SAMPLE_RATE: '0.5'
```

The configuration script also accepts the unprefixed keys (`GA_TRACKING_ID`, `FORMSPREE_ENDPOINT`, `SENTRY_DSN`, `ENABLE_ANALYTICS`, `ENABLE_ERROR_TRACKING`, `SENTRY_TRACES_SAMPLE_RATE`). This makes it easier to reuse existing provider secret names without duplicating values.

Store the secrets in the repository or organisation settings (Formspree values can live in secrets for convenience even though they are public). Refer to [docs/environment-configuration.md](docs/environment-configuration.md) for a more detailed checklist.

### Scripts
- `npm start` – run the dev server
- `npm run build` – build the project
- `npm test` – execute unit tests
- `npm run serve:ssr:portfolio` – serve the built SSR bundle
- `npm run generate:sitemap` – regenerate `robots.txt` and `sitemap.xml` (set `SITE_BASE_URL` before running)

### SEO metadata
- Default Open Graph and Twitter cards live in [`src/app/constants/meta.const.ts`](src/app/constants/meta.const.ts). Update the
  relevant language block to change titles, descriptions, keywords or preview images.
- `AppComponent` listens to `TranslationService` updates and applies the correct tags on both the server and the browser.
- Keep the Italian fallbacks in [`src/index.html`](src/index.html) aligned with the default language served by the static HTML
  shell.
- When adding a new language, extend `LANGUAGE_META_CONFIGURATION` with the new locale information and provide the translated
  notes in this README section.
- Future multi-page flows can inject a route resolver that merges page-specific data into the `Meta` service before navigation
  finishes so every view exposes dedicated tags.

### Project status levels
The projects section shows a glassmorphism card with a status pill and optional badges. The available levels and tags are
centralised in [`src/app/data/projects.data.ts`](src/app/data/projects.data.ts):

- **`active`** – Use for production-ready or actively maintained initiatives. The UI renders the pill with a cyan gradient.
- **`publicBeta`** – Reserve for projects that are publicly accessible but still collecting feedback. The pill uses the indigo
  accent.
- **`inDevelopment`** – Apply to prototypes or private work in progress. The pill switches to a warm amber gradient.

Optional tags are rendered as soft badges next to the pill:

- **`openSource`** – Highlights repositories that are publicly available.
- **`release2024`** – Communicates the target release window when relevant.

**Operational tips**

- When adding a new status or tag, extend both the `statusLegend.levels` and `statusLegend.tags` dictionaries for every
  language so the UI stays translated.
- Keep `ProjectStatusLevel` and `ProjectStatusTag` in [`src/app/dtos/ProjectDTO.ts`](src/app/dtos/ProjectDTO.ts) aligned with the
  keys used in the data file.
- Prefer reusing existing tags; introduce new ones only if they convey user-facing meaning that appears in the UI.

### Server-side Rendering
To run the application with SSR enabled:
```bash
npm run build
npm run serve:ssr:portfolio
```
The Express server listens on `http://localhost:4000` by default.

### Deployments
- **Production** – Tag the commit you want to publish with a prefix `v` (for example `v1.3.0`) and push the tag. The GitHub Actions workflow will build the project and update the `gh-pages` branch automatically.
  ```bash
  git tag v1.0.0 && git push origin v1.0.0
  ```
- **Pull Request preview** – Each open PR gets its own preview at `https://<github-username>.github.io/portfolio/previews/pr-<PR_NUMBER>/`. Once the `Deploy Preview to GitHub Pages / build-and-deploy` job succeeds, the same URL is shown in the PR environments panel.

### License
This repository is distributed under the [MIT License](LICENSE). Key dependencies such as Angular and Express also adopt the MIT terms, ensuring the stack remains permissively licensed.

---

## Italiano

### Panoramica
Questo repository contiene un'applicazione portfolio sviluppata con **Angular 18** e **Express** per il rendering lato server. Ogni sezione della pagina (hero, chi sono, progetti, competenze, educazione, esperienze, statistiche e modulo contatti) è implementata come componente standalone. I contenuti sono disponibili sia in inglese che in italiano.

### Struttura del progetto
La struttura del progetto è descritta nella sezione [Project Structure](#project-structure) ed è identica per tutte le lingue.

### Tecnologie
- **Framework:** Angular 18
- **SSR:** Express
- **Linguaggio:** TypeScript
- **Stili:** SCSS
- **Tooling:** npm, Angular CLI

### Avvio del progetto
1. Installa le dipendenze:
   ```bash
   npm install
   ```
   Se l'installazione restituisce l'errore `403 Forbidden` a causa di una configurazione
   di proxy, azzera le variabili proxy ereditate da npm e riprova:
   ```bash
   unset npm_config_http_proxy
   unset npm_config_https_proxy
   npm install
   ```
2. Avvia il server di sviluppo:
   ```bash
   npm start
   ```
   Apri `http://localhost:4200` per vedere l'app. Il browser si aggiorna ad ogni modifica dei file.
3. Esegui i test:
   ```bash
   npm test
   ```

### Configurazione dell'ambiente
Le impostazioni di analytics, del modulo contatti e del monitoraggio errori sono definite nei file Angular in [`src/environments/`](src/environments/).
Aggiorna le seguenti chiavi prima di pubblicare:

- `gaTrackingId` – codice di tracciamento di Google Analytics 4 (il measurement ID è pubblico e distribuito insieme al bundle client).
- `formspreeEndpoint` – endpoint Formspree utilizzato da `EmailService` (anch'esso pubblico perché deve essere raggiungibile dal browser).
- `enableAnalytics` / `enableErrorTracking` – flag per caricare gli script esterni.
- `sentryDsn` e `sentryTracesSampleRate` – credenziali di Sentry e frequenza di campionamento.

Mantieni il file di produzione (`environment.prod.ts`) libero da credenziali private. Entrambi gli identificativi possono essere pubblici, ma puoi tenere i valori reali fuori da git generando il file durante la build. Esegui `npm run configure:env:prod` in locale o in CI per scrivere la configurazione di produzione partendo dalle variabili d'ambiente:

```yaml
- name: Write production environment file
  run: npm run configure:env:prod
  env:
    NG_APP_GA_TRACKING_ID: ${{ secrets.GA_TRACKING_ID }}
    NG_APP_FORMSPREE_ENDPOINT: ${{ secrets.FORMSPREE_ENDPOINT }}
    NG_APP_ENABLE_ANALYTICS: 'true'
    NG_APP_ENABLE_ERROR_TRACKING: 'true'
    NG_APP_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
    NG_APP_SENTRY_TRACES_SAMPLE_RATE: '0.5'
```

Archivia i secret nelle impostazioni del repository o dell'organizzazione (puoi salvare anche l'endpoint Formspree per praticità, pur essendo pubblico). Consulta [docs/environment-configuration.md](docs/environment-configuration.md) per una checklist dettagliata.

### Script
- `npm start` – avvia il server di sviluppo
- `npm run build` – compila il progetto
- `npm test` – esegue i test unitari
- `npm run serve:ssr:portfolio` – serve il bundle SSR compilato
- `npm run generate:sitemap` – rigenera `robots.txt` e `sitemap.xml` (imposta `SITE_BASE_URL` prima di eseguirlo)

### Metadati SEO
- I metadati predefiniti per Open Graph e Twitter sono centralizzati in [`src/app/constants/meta.const.ts`](src/app/constants/meta.const.ts).
  Aggiorna il blocco della lingua interessata per modificare titoli, descrizioni, parole chiave o immagini di anteprima.
- `AppComponent` ascolta gli aggiornamenti del `TranslationService` e applica i tag corretti sia sul server sia nel browser.
- Mantieni gli eventuali fallback italiani in [`src/index.html`](src/index.html) coerenti con la lingua servita dallo shell HTML
  statico.
- Quando aggiungi una nuova lingua, estendi `LANGUAGE_META_CONFIGURATION` con le informazioni locali e ricorda di aggiornare
  questa sezione del README con le istruzioni tradotte.
- Per eventuali pagine dedicate puoi collegare un resolver di rotta che aggiorni il servizio `Meta` con contenuti specifici
  prima del completamento della navigazione, così ogni vista espone i tag corretti.

### Livelli di stato dei progetti
La sezione progetti mostra una card con effetto glassmorphism che include un badge di stato e tag opzionali. I valori sono
centralizzati in [`src/app/data/projects.data.ts`](src/app/data/projects.data.ts):

- **`active`** – Per iniziative in produzione o con manutenzione attiva. Il badge usa un gradiente ciano.
- **`publicBeta`** – Per progetti accessibili al pubblico ma ancora in raccolta feedback. Il badge usa l’accento indaco.
- **`inDevelopment`** – Per prototipi o lavori in corso privati. Il badge passa a un gradiente ambrato.

I tag opzionali sono visualizzati come etichette soft accanto al badge:

- **`openSource`** – Evidenzia repository pubblici.
- **`release2024`** – Comunica una finestra di rilascio quando pertinente.

**Linee guida operative**

- Quando aggiungi uno stato o un tag, aggiorna i dizionari `statusLegend.levels` e `statusLegend.tags` per ogni lingua per
  mantenere la traduzione in linea con l’interfaccia.
- Mantieni `ProjectStatusLevel` e `ProjectStatusTag` in [`src/app/dtos/ProjectDTO.ts`](src/app/dtos/ProjectDTO.ts) coerenti con
  le chiavi del file dati.
- Riutilizza i tag esistenti quando possibile; introdurne di nuovi solo se portano un messaggio utile per l’utente finale.

### Rendering lato server
Per eseguire l'applicazione con il rendering lato server:
```bash
npm run build
npm run serve:ssr:portfolio
```
Il server Express è in ascolto su `http://localhost:4000`.

### Deployment
- **Produzione** – Aggiungi un tag con prefisso `v` (es. `v1.3.0`) al commit da pubblicare e pushalo. Il workflow di GitHub Actions compilerà il progetto e aggiornerà automaticamente il branch `gh-pages`.
  ```bash
  git tag v1.0.0 && git push origin v1.0.0
  ```
- **Anteprima delle Pull Request** – Ogni PR aperta pubblica un'anteprima su `https://<github-username>.github.io/portfolio/previews/pr-<NUMERO_PR>/`. Quando il job `Deploy Preview to GitHub Pages / build-and-deploy` va a buon fine, lo stesso link compare anche nel pannello degli ambienti della PR.

### Licenza
Questo repository è distribuito con [licenza MIT](LICENSE). Anche dipendenze principali come Angular ed Express adottano condizioni MIT, mantenendo l'intero stack con una licenza permissiva.

---

## Deutsch

### Überblick
Dieses Repository enthält eine Portfolio-Anwendung, die mit **Angular 18** entwickelt wurde. Sie nutzt **Express** für serverseitiges Rendering (SSR) und unterstützt Inhalte auf Englisch, Italienisch, Deutsch und Spanisch. Jeder Seitenabschnitt (Hero, Über mich, Projekte, Fähigkeiten, Ausbildung, Erfahrungen, Statistiken und Kontaktformular) ist als eigenständige Komponente umgesetzt.

### Projektstruktur
Die Projektstruktur findest du in der gemeinsamen Sektion [Project Structure](#project-structure); sie gilt für alle Sprachen.

### Technologie-Stack
- **Framework:** Angular 18
- **SSR:** Express
- **Sprache:** TypeScript
- **Styles:** SCSS
- **Tooling:** npm, Angular CLI

### Erste Schritte
1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Entwicklungsserver starten:
   ```bash
   npm start
   ```
   Öffne `http://localhost:4200`, um die App zu sehen. Der Browser aktualisiert sich bei Dateiänderungen.
3. Tests ausführen:
   ```bash
   npm test
   ```

### Umgebungsvariablen
Analytics, Kontaktformular und Fehlüberwachung werden über die Angular-Umgebungsdateien unter [`src/environments/`](src/environments/) gesteuert.
Aktualisiere vor einer Veröffentlichung folgende Schlüssel:

- `gaTrackingId` – Google-Analytics-4-Tracking-ID (die Measurement-ID ist öffentlich und wird mit dem Client-Bundle ausgeliefert).
- `formspreeEndpoint` – Formspree-Endpunkt, den `EmailService` verwendet (ebenfalls öffentlich, da der Browser ihn erreichen muss).
- `enableAnalytics` / `enableErrorTracking` – Schalter zum Laden der externen Skripte.
- `sentryDsn` und `sentryTracesSampleRate` – Sentry-Zugangsdaten und Sampling-Rate.

Halte die Produktionsdatei (`environment.prod.ts`) frei von privaten Zugangsdaten. Beide Kennungen dürfen zwar öffentlich sein, du kannst die produktiven Werte jedoch außerhalb von Git belassen, indem du die Datei während des Builds generierst. Führe `npm run configure:env:prod` lokal oder in CI aus, um die Produktionskonfiguration aus Umgebungsvariablen zu schreiben:

```yaml
- name: Write production environment file
  run: npm run configure:env:prod
  env:
    NG_APP_GA_TRACKING_ID: ${{ secrets.GA_TRACKING_ID }}
    NG_APP_FORMSPREE_ENDPOINT: ${{ secrets.FORMSPREE_ENDPOINT }}
    NG_APP_ENABLE_ANALYTICS: 'true'
    NG_APP_ENABLE_ERROR_TRACKING: 'true'
    NG_APP_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
    NG_APP_SENTRY_TRACES_SAMPLE_RATE: '0.5'
```

Hinterlege die Secrets in den Repository- oder Organisations-Einstellungen (auch der Formspree-Endpunkt kann dort aus Gründen der Übersichtlichkeit liegen, obwohl er öffentlich ist). Weitere Details findest du in [docs/environment-configuration.md](docs/environment-configuration.md).

### Skripte
- `npm start` – startet den Entwicklungsserver
- `npm run build` – baut das Projekt
- `npm test` – führt Unit-Tests aus
- `npm run serve:ssr:portfolio` – dient das gebaute SSR-Bundle
- `npm run generate:sitemap` – generiert `robots.txt` und `sitemap.xml` neu (setze `SITE_BASE_URL` vor dem Ausführen)

### SEO-Metadaten
- Die Standardwerte für Open Graph und Twitter Cards befinden sich in [`src/app/constants/meta.const.ts`](src/app/constants/meta.const.ts).
  Aktualisiere den entsprechenden Sprachblock, um Titel, Beschreibungen, Keywords oder Vorschaubilder anzupassen.
- `AppComponent` reagiert auf Änderungen des `TranslationService` und setzt die Tags sowohl beim Server-Rendering als auch im
  Browser.
- Halte die italienischen Fallbacks in [`src/index.html`](src/index.html) synchron mit der Standardsprache, die vom statischen
  HTML-Shell ausgeliefert wird.
- Wenn du eine neue Sprache ergänzt, erweitere `LANGUAGE_META_CONFIGURATION` um die Lokalisierungsdaten und ergänze eine
  Übersetzung dieser Hinweise im README.
- Für zukünftige Unterseiten kannst du einen Routen-Resolver registrieren, der vor Abschluss der Navigation seitenspezifische
  Informationen in den `Meta`-Service einspielt.

### Serverseitiges Rendern
Um die Anwendung mit aktiviertem SSR auszuführen:
```bash
npm run build
npm run serve:ssr:portfolio
```
Der Express-Server ist standardmäßig unter `http://localhost:4000` erreichbar.

### Bereitstellungen
- **Produktion** – Versioniere den gewünschten Commit mit einem Tag, das mit `v` beginnt (z. B. `v1.3.0`), und pushe das Tag. Das GitHub-Actions-Workflow baut das Projekt und aktualisiert den `gh-pages`-Branch automatisch.
  ```bash
  git tag v1.0.0 && git push origin v1.0.0
  ```
- **Pull-Request-Vorschau** – Für jede offene PR wird eine Vorschau unter `https://<github-username>.github.io/portfolio/previews/pr-<PR_NUMMER>/` veröffentlicht. Nachdem der Job `Deploy Preview to GitHub Pages / build-and-deploy` erfolgreich war, erscheint derselbe Link im Umgebungsbereich der PR.

### Lizenz
Dieses Repository steht unter der [MIT-Lizenz](LICENSE). Zentrale Abhängigkeiten wie Angular und Express verwenden ebenfalls MIT-Bedingungen, sodass der gesamte Stack permissiv lizenziert bleibt.

---

## Español

### Descripción general
Este repositorio contiene una aplicación de portafolio construida con **Angular 18**. Utiliza **Express** para proporcionar renderizado del lado del servidor (SSR) y admite contenido en inglés, italiano, alemán y español. Cada sección de la página (hero, sobre mí, proyectos, habilidades, educación, experiencias, estadísticas y formulario de contacto) está implementada como un componente independiente.

### Estructura del proyecto
La estructura es la misma descrita en [Project Structure](#project-structure) y se comparte entre todos los idiomas.

### Tecnologías
- **Framework:** Angular 18
- **SSR:** Express
- **Lenguaje:** TypeScript
- **Estilos:** SCSS
- **Tooling:** npm, Angular CLI

### Primeros pasos
1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```
   Abre `http://localhost:4200` para ver la aplicación. El navegador se recarga al modificar los archivos.
3. Ejecuta las pruebas:
   ```bash
   npm test
   ```

### Configuración de entorno
La analítica, el formulario de contacto y el seguimiento de errores se controlan mediante los archivos de entorno de Angular que se encuentran en [`src/environments/`](src/environments/).
Actualiza las siguientes claves antes de desplegar:

- `gaTrackingId` – identificador de seguimiento de Google Analytics 4 (el measurement ID es público y se entrega con el bundle del cliente).
- `formspreeEndpoint` – endpoint de Formspree usado por `EmailService` (también público porque el navegador debe acceder a él).
- `enableAnalytics` / `enableErrorTracking` – interruptores para cargar los scripts externos.
- `sentryDsn` y `sentryTracesSampleRate` – credenciales de Sentry y tasa de muestreo.

Mantén el archivo de producción (`environment.prod.ts`) libre de credenciales privadas. Ambos identificadores pueden ser públicos, pero puedes mantener los valores reales fuera de git generando el archivo durante la compilación. Ejecuta `npm run configure:env:prod` en local o en CI para escribir la configuración de producción a partir de variables de entorno:

```yaml
- name: Write production environment file
  run: npm run configure:env:prod
  env:
    NG_APP_GA_TRACKING_ID: ${{ secrets.GA_TRACKING_ID }}
    NG_APP_FORMSPREE_ENDPOINT: ${{ secrets.FORMSPREE_ENDPOINT }}
    NG_APP_ENABLE_ANALYTICS: 'true'
    NG_APP_ENABLE_ERROR_TRACKING: 'true'
    NG_APP_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
    NG_APP_SENTRY_TRACES_SAMPLE_RATE: '0.5'
```

Guarda los secretos en la configuración del repositorio u organización (puedes incluir el endpoint de Formspree por comodidad, aunque sea público). Consulta [docs/environment-configuration.md](docs/environment-configuration.md) para un listado detallado.

### Scripts disponibles
- `npm start` – ejecuta el servidor de desarrollo
- `npm run build` – compila el proyecto
- `npm test` – ejecuta las pruebas unitarias
- `npm run serve:ssr:portfolio` – sirve el paquete SSR compilado
- `npm run generate:sitemap` – regenera `robots.txt` y `sitemap.xml` (define `SITE_BASE_URL` antes de ejecutarlo)

### Metadatos SEO
- Los valores por defecto de Open Graph y Twitter están centralizados en [`src/app/constants/meta.const.ts`](src/app/constants/meta.const.ts).
  Actualiza el bloque del idioma correspondiente para modificar títulos, descripciones, palabras clave o imágenes de vista previa.
- `AppComponent` escucha al `TranslationService` y aplica las etiquetas correctas tanto en el renderizado del servidor como en el
  del navegador.
- Mantén los metadatos italianos de respaldo en [`src/index.html`](src/index.html) alineados con el idioma predeterminado del shell
  HTML estático.
- Al añadir un nuevo idioma, amplía `LANGUAGE_META_CONFIGURATION` con la nueva configuración regional y añade una nota traducida
  en esta sección del README.
- Para futuras páginas adicionales puedes utilizar un resolver de ruta que inyecte datos específicos en el servicio `Meta` antes
  de completar la navegación, garantizando etiquetas dedicadas por vista.

### Renderizado del lado del servidor
Para ejecutar la aplicación con SSR habilitado:
```bash
npm run build
npm run serve:ssr:portfolio
```
El servidor Express escucha en `http://localhost:4000` por defecto.

### Despliegues
- **Producción** – Etiqueta el commit que quieres publicar con un prefijo `v` (por ejemplo, `v1.3.0`) y sube la etiqueta. El workflow de GitHub Actions compilará el proyecto y actualizará automáticamente la rama `gh-pages`.
  ```bash
  git tag v1.0.0 && git push origin v1.0.0
  ```
- **Vista previa de Pull Request** – Cada PR abierta publica una vista previa en `https://<github-username>.github.io/portfolio/previews/pr-<NÚMERO_PR>/`. Cuando el job `Deploy Preview to GitHub Pages / build-and-deploy` finaliza correctamente, el mismo enlace aparece en el panel de entornos de la PR.

### Licencia
Este repositorio se distribuye bajo la [licencia MIT](LICENSE). Dependencias clave como Angular y Express también utilizan términos MIT, manteniendo una licencia permisiva en todo el stack.
