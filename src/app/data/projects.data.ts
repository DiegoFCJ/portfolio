import { ProjectsLangs } from '../dtos/ProjectDTO';

export const projects: ProjectsLangs = {
    en: {
        title: 'Featured Projects',
        button: 'View Project',
        moreDesc: '... More',
        lessDesc: ' Less',
        projects: [
            {
                title: 'Micro Games',
                description: 'A collection of simple games built using various technologies. Key Features: Multiple mini-games designed to challenge players. Interactive UI with responsive design. Easy to extend with new games and features.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                link: 'https://github.com/DiegoFCJ/MicroGames',
                expanded: false
            },
            {
                title: 'Self',
                description: 'This project provides tools for tracking goals and progress, focusing on self-improvement and productivity through an intuitive interface. Users can add plugins for enhanced functionality. Key Features: Goal tracking and visualization, User-friendly task management dashboard, Optimized with modern web technologies.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                link: 'https://github.com/DiegoFCJ/self',
                expanded: false
            },
            {
                title: 'E-commerce',
                description: 'This repository serves as the foundation for an e-commerce application, providing essential features and structure for building a robust online shopping platform.',
                image: 'https://github.com/DiegoFCJ/E-commerce/blob/master/overview/homeSideDash.png?raw=true',
                link: 'https://github.com/DiegoFCJ/E-commerce',
                expanded: false
            }
        ]
    },
    it: {
        title: 'Progetti in Evidenza',
        button: 'Visualizza Progetto',
        moreDesc: '... Di più',
        lessDesc: ' Di meno',
        projects: [
            {
                title: 'Micro Games',
                description: 'Una raccolta di giochi semplici costruiti utilizzando varie tecnologie. Caratteristiche principali: Molti mini-giochi progettati per sfidare i giocatori. UI interattiva con design reattivo. Facile da estendere con nuovi giochi e funzionalità.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                link: 'https://github.com/DiegoFCJ/MicroGames',
                expanded: false
            },
            {
                title: 'Self',
                description: 'Questo progetto fornisce strumenti per monitorare obiettivi e progressi, con un focus sull\'auto-miglioramento e produttività tramite un\'interfaccia intuitiva. Gli utenti possono aggiungere plugin per funzionalità avanzate. Caratteristiche principali: Monitoraggio obiettivi e visualizzazione, Dashboard di gestione attività intuitiva, Ottimizzato con tecnologie web moderne.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                link: 'https://github.com/DiegoFCJ/self',
                expanded: false
            },
            {
                title: 'E-commerce',
                description: 'Questo repository serve come base per un\'applicazione di e-commerce, fornendo funzionalità essenziali e struttura per costruire una piattaforma di shopping online robusta.',
                image: 'https://github.com/DiegoFCJ/E-commerce/blob/master/overview/homeSideDash.png?raw=true',
                link: 'https://github.com/DiegoFCJ/E-commerce',
                expanded: false
            }
        ]
    }
};
