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

### Scripts
- `npm start` – run the dev server
- `npm run build` – build the project
- `npm test` – execute unit tests
- `npm run serve:ssr:portfolio` – serve the built SSR bundle
- `npm run generate:sitemap` – regenerate `robots.txt` and `sitemap.xml` (set `SITE_BASE_URL` before running)

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

### Script
- `npm start` – avvia il server di sviluppo
- `npm run build` – compila il progetto
- `npm test` – esegue i test unitari
- `npm run serve:ssr:portfolio` – serve il bundle SSR compilato
- `npm run generate:sitemap` – rigenera `robots.txt` e `sitemap.xml` (imposta `SITE_BASE_URL` prima di eseguirlo)

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

### Skripte
- `npm start` – startet den Entwicklungsserver
- `npm run build` – baut das Projekt
- `npm test` – führt Unit-Tests aus
- `npm run serve:ssr:portfolio` – dient das gebaute SSR-Bundle
- `npm run generate:sitemap` – generiert `robots.txt` und `sitemap.xml` neu (setze `SITE_BASE_URL` vor dem Ausführen)

### Serverseitiges Rendern
Um die Anwendung mit aktiviertem SSR auszuführen:
```bash
npm run build
npm run serve:ssr:portfolio
```
Der Express-Server ist standardmäßig unter `http://localhost:4000` erreichbar.

### Bereitstellungen
- **Produktion** – Versioniere den gewünschten Commit mit einem Tag, das mit `v` beginnt (z. B. `v1.3.0`), und pushe das Tag. Das GitHub-Actions-Workflow baut das Projekt und aktualisiert den `gh-pages`-Branch automatisch.
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

### Scripts disponibles
- `npm start` – ejecuta el servidor de desarrollo
- `npm run build` – compila el proyecto
- `npm test` – ejecuta las pruebas unitarias
- `npm run serve:ssr:portfolio` – sirve el paquete SSR compilado
- `npm run generate:sitemap` – regenera `robots.txt` y `sitemap.xml` (define `SITE_BASE_URL` antes de ejecutarlo)

### Renderizado del lado del servidor
Para ejecutar la aplicación con SSR habilitado:
```bash
npm run build
npm run serve:ssr:portfolio
```
El servidor Express escucha en `http://localhost:4000` por defecto.

### Despliegues
- **Producción** – Etiqueta el commit que quieres publicar con un prefijo `v` (por ejemplo, `v1.3.0`) y sube la etiqueta. El workflow de GitHub Actions compilará el proyecto y actualizará automáticamente la rama `gh-pages`.
- **Vista previa de Pull Request** – Cada PR abierta publica una vista previa en `https://<github-username>.github.io/portfolio/previews/pr-<NÚMERO_PR>/`. Cuando el job `Deploy Preview to GitHub Pages / build-and-deploy` finaliza correctamente, el mismo enlace aparece en el panel de entornos de la PR.

### Licencia
Este repositorio se distribuye bajo la [licencia MIT](LICENSE). Dependencias clave como Angular y Express también utilizan términos MIT, manteniendo una licencia permisiva en todo el stack.
