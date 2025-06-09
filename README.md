# Portfolio

## Index
- [English](#english)
  - [Overview](#overview)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
  - [Scripts](#scripts)
  - [Server-side Rendering](#server-side-rendering)
- [Italiano](#italiano)
  - [Panoramica](#panoramica)
  - [Struttura del progetto](#struttura-del-progetto)
  - [Avvio del progetto](#avvio-del-progetto)
  - [Script](#script)
  - [Rendering lato server](#rendering-lato-server)

## English

### Overview
This repository contains a portfolio application built with **Angular 18**. It uses **Express** to provide server-side rendering (SSR) and supports both English and Italian content. Each page section (hero, about me, projects, skills, education, experiences, statistics and contact form) is implemented as a standalone component.

### Project Structure
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

### Getting Started
1. Install dependencies:
   ```bash
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

### Server-side Rendering
To run the application with SSR enabled:
```bash
npm run build
npm run serve:ssr:portfolio
```
The Express server listens on `http://localhost:4000` by default.

---

## Italiano

### Panoramica
Questo repository contiene un'applicazione portfolio sviluppata con **Angular 18** e **Express** per il rendering lato server. Ogni sezione della pagina (hero, chi sono, progetti, competenze, educazione, esperienze, statistiche e modulo contatti) è implementata come componente standalone. I contenuti sono disponibili sia in inglese che in italiano.

### Struttura del progetto
```
.
├── server.ts                 # Server Express per SSR
├── src/
│   ├── main.ts               # Bootstrap client
│   ├── main.server.ts        # Bootstrap server
│   ├── app/
│   │   ├── components/       # Componenti UI
│   │   ├── pages/            # Pagine
│   │   ├── services/         # Servizi (traduzione, email...)
│   │   ├── data/             # Dati multilingua
│   │   └── dtos/             # Interfacce TypeScript
│   └── styles/               # SCSS globali
└── angular.json              # Configurazione Angular CLI
```

### Avvio del progetto
1. Installa le dipendenze:
   ```bash
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

### Rendering lato server
Per eseguire l'applicazione con il rendering lato server:
```bash
npm run build
npm run serve:ssr:portfolio
```
Il server Express è in ascolto su `http://localhost:4000`.
