import { ProjectsLangs } from '../dtos/ProjectDTO';

export const projects: ProjectsLangs = {
    it: {
        title: 'Progetti in Evidenza',
        button: 'Apri il progetto',
        toggle: {
            expand: 'Mostra dettagli',
            collapse: 'Riduci dettagli'
        },
        navigation: {
            previous: 'Progetto precedente',
            next: 'Progetto successivo'
        },
        statusLegend: {
            prefix: 'Stato',
            levels: {
                active: 'Attivo',
                publicBeta: 'Beta pubblica',
                inDevelopment: 'In sviluppo'
            },
            tags: {
                openSource: 'Open source',
                release2024: 'Lancio 2024'
            }
        },
        projects: [
            {
                title: 'Micro Games',
                status: {
                    level: 'active',
                    tags: ['openSource']
                },
                technologies: ['Angular 16', 'TypeScript', 'RxJS', 'SCSS', 'Node.js'],
                description: 'Suite modulare di mini-giochi casual con core condiviso, profili giocatore e leaderboard mobile-ready per sessioni rapide.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                link: 'https://github.com/DiegoFCJ/MicroGames',
                expanded: false
            },
            {
                title: 'Self',
                status: {
                    level: 'publicBeta',
                    tags: ['release2024']
                },
                technologies: ['Angular 17', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
                description: 'Hub di produttività che traccia abitudini, espone un marketplace di plugin e sincronizza obiettivi con promemoria su calendario multi-dispositivo.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                link: 'https://github.com/DiegoFCJ/self',
                expanded: false
            },
            {
                title: 'E-commerce',
                status: {
                    level: 'inDevelopment'
                },
                technologies: ['Spring Boot 3', 'Angular 17', 'MySQL', 'Keycloak', 'Docker'],
                description: 'Template headless per e-commerce con checkout modulare, workflow di magazzino e dashboard amministrativa pronta per integrazioni ERP.',
                image: 'https://github.com/DiegoFCJ/E-commerce/blob/master/overview/homeSideDash.png?raw=true',
                link: 'https://github.com/DiegoFCJ/E-commerce',
                expanded: false
            }
        ]
    },
    en: {
        title: 'Featured Projects',
        button: 'View Project',
        toggle: {
            expand: 'Show details',
            collapse: 'Hide details'
        },
        navigation: {
            previous: 'Previous project',
            next: 'Next project'
        },
        statusLegend: {
            prefix: 'Status',
            levels: {
                active: 'Active',
                publicBeta: 'Public beta',
                inDevelopment: 'In development'
            },
            tags: {
                openSource: 'Open source',
                release2024: '2024 launch'
            }
        },
        projects: [
            {
                title: 'Micro Games',
                status: {
                    level: 'active',
                    tags: ['openSource']
                },
                technologies: ['Angular 16', 'TypeScript', 'RxJS', 'SCSS', 'Node.js'],
                description: 'Modular suite of casual mini-games with shared core, player profiles and a mobile-ready leaderboard for quick sessions.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                link: 'https://github.com/DiegoFCJ/MicroGames',
                expanded: false
            },
            {
                title: 'Self',
                status: {
                    level: 'publicBeta',
                    tags: ['release2024']
                },
                technologies: ['Angular 17', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
                description: 'Productivity hub that tracks habits, exposes a plugin marketplace and syncs goals with calendar reminders across devices.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                link: 'https://github.com/DiegoFCJ/self',
                expanded: false
            },
            {
                title: 'E-commerce',
                status: {
                    level: 'inDevelopment'
                },
                technologies: ['Spring Boot 3', 'Angular 17', 'MySQL', 'Keycloak', 'Docker'],
                description: 'Headless commerce template with modular checkout, inventory workflows and an admin dashboard ready for ERP integrations.',
                image: 'https://github.com/DiegoFCJ/E-commerce/blob/master/overview/homeSideDash.png?raw=true',
                link: 'https://github.com/DiegoFCJ/E-commerce',
                expanded: false
            }
        ]
    }
};
