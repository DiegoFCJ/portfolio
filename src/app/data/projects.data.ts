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
                status: 'Status: Active · Open source',
                technologies: ['Angular 16', 'TypeScript', 'RxJS', 'SCSS', 'Node.js'],
                description: 'Modular suite of casual mini-games with shared core, player profiles and a mobile-ready leaderboard for quick sessions.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                link: 'https://github.com/DiegoFCJ/MicroGames',
                expanded: false
            },
            {
                title: 'Self',
                status: 'Status: Public beta (2024)',
                technologies: ['Angular 17', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
                description: 'Productivity hub that tracks habits, exposes a plugin marketplace and syncs goals with calendar reminders across devices.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                link: 'https://github.com/DiegoFCJ/self',
                expanded: false
            },
            {
                title: 'E-commerce',
                status: 'Status: In development',
                technologies: ['Spring Boot 3', 'Angular 17', 'MySQL', 'Keycloak', 'Docker'],
                description: 'Headless commerce template with modular checkout, inventory workflows and an admin dashboard ready for ERP integrations.',
                image: 'https://github.com/DiegoFCJ/E-commerce/blob/master/overview/homeSideDash.png?raw=true',
                link: 'https://github.com/DiegoFCJ/E-commerce',
                expanded: false
            }
        ]
    }
};
