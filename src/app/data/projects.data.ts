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
                title: 'BorgoSaMarina',
                status: {
                    level: 'inDevelopment'
                },
                technologies: ['Next.js', 'GitHub', 'Google Analytics'],
                description: 'Rinnovo completo del sito vetrina per appartamenti in affitto. Migrazione dal vecchio sito in PHP a Next.js con traduzioni dinamiche, rendering ottimizzato dei dati e integrazione multimediale con contenuti realizzati tramite drone. Progetto in fase di completamento.',
                image: 'assets/projects/borgo-samarina-cover.svg',
                link: 'https://borgosamarina-com.web.app/'
            },
            {
                title: 'Empowerely',
                status: {
                    level: 'active'
                },
                technologies: ['Java 24', 'Spring Boot', 'Next.js', 'MySQL', 'Dataiku', 'Figma'],
                description: 'Attività di volontariato come sviluppatore full-stack. Sviluppo di funzionalità evolutive e integrazione con Dataiku per la preparazione e l’addestramento di modelli di intelligenza artificiale, con visualizzazione frontend interattiva dei dati.',
                image: 'assets/projects/borgo-samarina-cover.svg',
                link: 'https://github.com/DiegoFCJ?tab=repositories'
            },
            {
                title: 'Support Bot',
                status: {
                    level: 'inDevelopment'
                },
                technologies: ['Python', 'JavaScript', 'Java', 'Shell Script', 'Batch', 'Flutter', 'Dart'],
                description: 'Sistema automatizzato per la gestione, l’attivazione e il monitoraggio di bot dedicati ad attività personali e ricorrenti. Progettato in più linguaggi per massimizzare flessibilità e interoperabilità.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                link: 'https://github.com/DiegoFCJ/self'
            },
            {
                title: 'FantaVolley',
                status: {
                    level: 'active'
                },
                technologies: ['React', 'Java', 'MySQL'],
                description: 'Sviluppo di componenti frontend dinamici per la visualizzazione interattiva dei regolamenti della piattaforma e ottimizzazione dell’esperienza utente.',
                image: 'assets/projects/borgo-samarina-cover.svg',
                link: 'https://github.com/DiegoFCJ?tab=repositories'
            },
            {
                title: 'Progetto di Fine Corso – TNV Academy',
                status: {
                    level: 'active'
                },
                technologies: ['Spring Boot', '.NET', 'Node.js', 'MySQL', 'Angular 14'],
                description: 'Sviluppo di un minigioco web a tema cinema con registrazione, login, gestione preferiti, commenti, valutazioni, profilo personale e classifica basata sui punteggi.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                link: 'https://github.com/DiegoFCJ/MicroGames'
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
                title: 'BorgoSaMarina',
                status: {
                    level: 'inDevelopment'
                },
                technologies: ['Next.js', 'GitHub', 'Google Analytics'],
                description: 'Complete redesign of the rental showcase website. Migrated the old PHP site to Next.js with dynamic translations, optimised data rendering, and multimedia content captured with a drone. Currently being finalised.',
                image: 'assets/projects/borgo-samarina-cover.svg',
                link: 'https://borgosamarina-com.web.app/'
            },
            {
                title: 'Empowerely',
                status: {
                    level: 'active'
                },
                technologies: ['Java 24', 'Spring Boot', 'Next.js', 'MySQL', 'Dataiku', 'Figma'],
                description: 'Volunteering engagement as a full-stack developer. Built new features and integrated Dataiku pipelines for training AI models with interactive front-end data visualisations.',
                image: 'assets/projects/borgo-samarina-cover.svg',
                link: 'https://github.com/DiegoFCJ?tab=repositories'
            },
            {
                title: 'Support Bot',
                status: {
                    level: 'inDevelopment'
                },
                technologies: ['Python', 'JavaScript', 'Java', 'Shell Script', 'Batch', 'Flutter', 'Dart'],
                description: 'Automated system to manage, trigger and monitor bots dedicated to personal and recurring tasks. Built with multiple languages to maximise flexibility and interoperability.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                link: 'https://github.com/DiegoFCJ/self'
            },
            {
                title: 'FantaVolley',
                status: {
                    level: 'active'
                },
                technologies: ['React', 'Java', 'MySQL'],
                description: 'Developed dynamic front-end components to display platform regulations interactively, improving the user experience.',
                image: 'assets/projects/borgo-samarina-cover.svg',
                link: 'https://github.com/DiegoFCJ?tab=repositories'
            },
            {
                title: 'Final Course Project – TNV Academy',
                status: {
                    level: 'active'
                },
                technologies: ['Spring Boot', '.NET', 'Node.js', 'MySQL', 'Angular 14'],
                description: 'Cinema-themed web mini-game featuring user registration, login, favourites, comments, ratings, personal profiles and a score-based leaderboard.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                link: 'https://github.com/DiegoFCJ/MicroGames'
            }
        ]
    }
};
