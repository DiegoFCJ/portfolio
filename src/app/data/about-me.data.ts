import { AboutMeLangs } from '../dtos/AboutMeDTO';

export const aboutMeData: AboutMeLangs = {
    it: {
        title: 'Chi Sono',
        paragraphs: [
            'Sono uno sviluppatore software junior motivato con esperienza nello sviluppo full-stack e nell’automazione dei processi.',
            'Negli ultimi progetti ho supportato team enterprise e freelance lavorando con Java, Spring Boot, Angular e Next.js in contesti ibridi e full remote.',
            'Imparo velocemente, collaboro volentieri con i colleghi e mi concentro su soluzioni scalabili che restano semplici da utilizzare.'
        ],
        highlightsTitle: 'Cosa porto nel team',
        highlights: [
            'Sviluppo full-stack con Java/Spring Boot e frontend in Angular o React.',
            'Automazione di attività ricorrenti con script su Linux e integrazioni Boomi.',
            'Collaborazione con team cross-funzionali e attenzione alla documentazione.'
        ]
    },
    en: {
        title: 'About Me',
        paragraphs: [
            'I am a motivated junior software developer with experience in full-stack development and process automation.',
            'Across recent engagements I have supported enterprise and freelance teams using Java, Spring Boot, Angular, and Next.js in hybrid and fully-remote settings.',
            'I learn quickly, collaborate closely with teammates, and focus on scalable solutions that stay easy to use.'
        ],
        highlightsTitle: 'What I bring to the team',
        highlights: [
            'Full-stack development with Java/Spring Boot and front-end work in Angular or React.',
            'Automation of recurring tasks on Linux with scripting and Boomi integrations.',
            'Team collaboration backed by clear documentation and knowledge sharing.'
        ]
    }
};
