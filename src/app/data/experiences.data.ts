import { ExperienceFullLangs } from '../dtos/ExperienceDTO';

export const experiencesData: ExperienceFullLangs = {
    it: {
        title: 'Esperienza',
        experiences: [
            {
                position: 'Sviluppatore Software',
                location: 'Completamente da remoto',
                startDate: 'Apr 2024',
                startDateValue: '2024-04-01',
                endDate: 'Giu 2025',
                endDateValue: '2025-06-01',
                technologies: 'Spring Boot (3.0), Java 21, JavaFX, Angular (18), Shell, YAML, AngularJS, Python',
                responsibilities: 'Ho guidato la modernizzazione delle piattaforme interne di gestione dei servizi per clienti della pubblica amministrazione.',
                responsibilityList: [
                    'Ho automatizzato il triage AMS manuale tramite workflow in Java 21 e script Shell per accelerare la risoluzione dei ticket.',
                    'Ho migrato le dashboard legacy da AngularJS ad Angular 18, migliorando usabilità e accessibilità per gli operatori.',
                    'Ho coordinato stakeholder distribuiti per definire le priorità di bug fixing e pianificare i rilasci.'
                ]
            },
            {
                position: 'Sviluppatore Software',
                location: 'Ibrido, Torino',
                startDate: 'Gen 2025',
                startDateValue: '2025-01-01',
                endDate: 'Giu 2025',
                endDateValue: '2025-06-01',
                technologies: 'Spring Boot, .NET, Node.js, MySQL, Angular 14',
                responsibilities: 'Ho supportato programmi di integrazione enterprise per un cliente bancario.',
                responsibilityList: [
                    'Ho implementato pipeline di logging personalizzate su server Linux con Java e Shell per soddisfare i requisiti di audit.',
                    'Ho automatizzato il monitoraggio quotidiano dei processi e la reportistica tramite script pianificati e dashboard.',
                    'Ho integrato i flussi Dell Boomi con servizi Spring Boot e .NET per esporre nuove funzionalità ai clienti.',
                    'Ho facilitato sessioni di condivisione della conoscenza per allineare sviluppatori, tester e team operativi.'
                ]
            },
            {
                position: 'Sviluppatore Software',
                location: 'Completamente da remoto',
                startDate: 'Ott 2023',
                startDateValue: '2023-10-01',
                endDate: 'Apr 2024',
                endDateValue: '2024-04-01',
                technologies: 'Spring Boot (3.1.7), Java 17, Angular 16, JWT, Argon2, MySQL, Git',
                responsibilities: 'Ho potenziato prodotti interni con funzionalità sicure sia lato back-end sia front-end.',
                responsibilityList: [
                    'Ho implementato microservizi Spring Boot protetti con autenticazione basata su JWT e Argon2.',
                    'Ho sviluppato moduli Angular 16 per il portale di gestione dei repository.',
                    'Ho automatizzato i flussi di deployment scriptando le procedure di rilascio basate su Git.'
                ]
            },
            {
                position: 'Sviluppatore Software',
                location: 'Ibrido',
                startDate: 'Feb 2023',
                startDateValue: '2023-02-01',
                endDate: 'Ott 2023',
                endDateValue: '2023-10-01',
                technologies: 'Java 8, Spring Boot, MySQL, Angular 7, Docker, OpenShift',
                responsibilities: "Ho contribuito allo sviluppo e al rilascio di piattaforme interne per clienti del settore dell'energia.",
                responsibilityList: [
                    'Ho sviluppato funzionalità per applicazioni Spring Boot e Angular 7 a supporto dei servizi di monitoraggio.',
                    'Ho containerizzato i workload con Docker e orchestrato i deployment su OpenShift.',
                    'Ho collaborato con i team DevOps per coordinare rilasci multi-squad e hotfix.'
                ]
            },
            {
                position: 'Sviluppatore Software',
                location: 'Torino',
                startDate: 'Giu 2022',
                startDateValue: '2022-06-01',
                endDate: 'Gen 2023',
                endDateValue: '2023-01-01',
                technologies: 'Java, Spring, Bash, Ansible, Oracle DB',
                responsibilities: 'Mi sono occupato di attività di manutenzione e automazione per clienti enterprise nel settore della mobilità.',
                responsibilityList: [
                    'Ho esteso servizi Java a supporto dei flussi di ticketing e delle integrazioni rivolte ai clienti.',
                    'Ho industrializzato le attività AMS automatizzando le operazioni ricorrenti con script Bash e Ansible.',
                    'Ho migliorato dashboard di monitoraggio e pipeline di analisi dei log utilizzate dai team di reperibilità.'
                ]
            }
        ]
    },
    en: {
        title: 'Experience',
        experiences: [
            {
                position: 'Software Developer',
                location: 'Full Remote',
                startDate: 'Apr 2024',
                startDateValue: '2024-04-01',
                endDate: 'Jun 2025',
                endDateValue: '2025-06-01',
                technologies: 'Spring Boot (3.0), Java 21, JavaFX, Angular (18), Shell, YAML, AngularJS, Python',
                responsibilities: 'Led the modernization of internal service-management platforms for public administration customers.',
                responsibilityList: [
                    'Automated manual AMS triage through Java 21 workflows and Shell scripts to accelerate ticket resolution.',
                    'Migrated legacy AngularJS dashboards to Angular 18, improving usability and accessibility for operators.',
                    'Coordinated with distributed stakeholders to prioritise bug fixing and schedule releases.'
                ]
            },
            {
                position: 'Software Developer',
                location: 'Hybrid, Turin',
                startDate: 'Jan 2025',
                startDateValue: '2025-01-01',
                endDate: 'Jun 2025',
                endDateValue: '2025-06-01',
                technologies: 'Spring Boot, .NET, Node.js, MySQL, Angular 14',
                responsibilities: 'Supported enterprise integration programmes for a banking client.',
                responsibilityList: [
                    'Implemented custom logging pipelines on Linux servers with Java and Shell to satisfy audit requirements.',
                    'Automated daily process monitoring and reporting through scheduled scripts and dashboards.',
                    'Integrated Dell Boomi flows with Spring Boot and .NET services to expose new customer features.',
                    'Facilitated knowledge-sharing sessions to align developers, testers, and operations teams.'
                ]
            },
            {
                position: 'Software Developer',
                location: 'Full Remote',
                startDate: 'Oct 2023',
                startDateValue: '2023-10-01',
                endDate: 'Apr 2024',
                endDateValue: '2024-04-01',
                technologies: 'Spring Boot (3.1.7), Java 17, Angular 16, JWT, Argon2, MySQL, Git',
                responsibilities: 'Enhanced internal products with secure back-end and front-end capabilities.',
                responsibilityList: [
                    'Implemented Spring Boot microservices secured with JWT and Argon2-based authentication.',
                    'Developed Angular 16 modules for the repository management portal.',
                    'Automated deployment workflows by scripting Git-based release procedures.'
                ]
            },
            {
                position: 'Software Developer',
                location: 'Hybrid',
                startDate: 'Feb 2023',
                startDateValue: '2023-02-01',
                endDate: 'Oct 2023',
                endDateValue: '2023-10-01',
                technologies: 'Java 8, Spring Boot, MySQL, Angular 7, Docker, OpenShift',
                responsibilities: 'Contributed to the development and deployment of internal platforms for energy sector clients.',
                responsibilityList: [
                    'Developed features for Spring Boot and Angular 7 applications supporting monitoring services.',
                    'Containerised workloads with Docker and orchestrated deployments on OpenShift.',
                    'Collaborated with DevOps teams to coordinate multi-squad releases and hotfixes.'
                ]
            },
            {
                position: 'Software Developer',
                location: 'Turin',
                startDate: 'Jun 2022',
                startDateValue: '2022-06-01',
                endDate: 'Jan 2023',
                endDateValue: '2023-01-01',
                technologies: 'Java, Spring, Bash, Ansible, Oracle DB',
                responsibilities: 'Focused on maintenance and automation activities for enterprise clients in the mobility sector.',
                responsibilityList: [
                    'Extended Java services powering ticketing workflows and customer-facing integrations.',
                    'Industrialised AMS activities by scripting routine tasks with Bash and Ansible.',
                    'Improved monitoring dashboards and log analysis pipelines used by on-call teams.'
                ]
            }
        ]
    }
};
