import { ExperienceFullLangs } from '../dtos/ExperienceDTO';

export const experiencesData: ExperienceFullLangs = {
    en: {
        title: 'Experience',
        experiences: [
            {
                position: 'Software Developer',
                location: 'Full Remote',
                startDate: 'Apr 2024',
                endDate: 'Jun 2025',
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
                endDate: 'Jun 2025',
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
                endDate: 'Apr 2024',
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
                endDate: 'Oct 2023',
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
                endDate: 'Jan 2023',
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
