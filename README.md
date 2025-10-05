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
- [Deutsch](#deutsch)
  - [Überblick](#ueberblick)
  - [Projektstruktur](#projektstruktur)
  - [Erste Schritte](#erste-schritte)
  - [Skripte](#skripte)
  - [Serverseitiges Rendern](#serverseitiges-rendern)
- [Español](#espanol)
  - [Descripción general](#descripcion-general)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Primeros pasos](#primeros-pasos)
  - [Scripts](#scripts-1)
  - [Renderizado del lado del servidor](#renderizado-del-lado-del-servidor)

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
- `npm run test:headless` – run the CI-friendly headless Chrome test suite
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

---

## Deutsch

### Überblick
Dieses Repository enthält eine Portfolio-Anwendung, die mit **Angular 18** entwickelt wurde. Sie nutzt **Express** für serverseitiges Rendering (SSR) und unterstützt Inhalte auf Englisch, Italienisch, Deutsch und Spanisch. Jeder Seitenabschnitt (Hero, Über mich, Projekte, Fähigkeiten, Ausbildung, Erfahrungen, Statistiken und Kontaktformular) ist als eigenständige Komponente umgesetzt.

### Projektstruktur
```
.
├── server.ts                 # Express-Server für SSR
├── src/
│   ├── main.ts               # Client-Bootstrap
│   ├── main.server.ts        # Server-Bootstrap
│   ├── app/
│   │   ├── components/       # UI-Komponenten
│   │   ├── pages/            # Seiten-Komponenten
│   │   ├── services/         # Dienste (Übersetzung, E-Mail...)
│   │   ├── data/             # Mehrsprachige Daten
│   │   └── dtos/             # TypeScript-Interfaces
│   └── styles/               # Globale SCSS
└── angular.json              # Angular-CLI-Konfiguration
```

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

### Serverseitiges Rendern
Um die Anwendung mit aktiviertem SSR auszuführen:
```bash
npm run build
npm run serve:ssr:portfolio
```
Der Express-Server ist standardmäßig unter `http://localhost:4000` erreichbar.

---

## Español

### Descripción general
Este repositorio contiene una aplicación de portafolio construida con **Angular 18**. Utiliza **Express** para proporcionar renderizado del lado del servidor (SSR) y admite contenido en inglés, italiano, alemán y español. Cada sección de la página (hero, sobre mí, proyectos, habilidades, educación, experiencias, estadísticas y formulario de contacto) está implementada como un componente independiente.

### Estructura del proyecto
```
.
├── server.ts                 # Servidor Express para SSR
├── src/
│   ├── main.ts               # Bootstrap del cliente
│   ├── main.server.ts        # Bootstrap del servidor
│   ├── app/
│   │   ├── components/       # Componentes de UI
│   │   ├── pages/            # Componentes de página
│   │   ├── services/         # Servicios (traducción, correo...)
│   │   ├── data/             # Datos multilingües
│   │   └── dtos/             # Interfaces TypeScript
│   └── styles/               # SCSS globales
└── angular.json              # Configuración de Angular CLI
```

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

### Scripts
- `npm start` – ejecuta el servidor de desarrollo
- `npm run build` – compila el proyecto
- `npm test` – ejecuta las pruebas unitarias
- `npm run serve:ssr:portfolio` – sirve el paquete SSR compilado

### Renderizado del lado del servidor
Para ejecutar la aplicación con SSR habilitado:
```bash
npm run build
npm run serve:ssr:portfolio
```
El servidor Express escucha en `http://localhost:4000` por defecto.
