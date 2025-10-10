import { ExperienceFullLangs } from '../dtos/ExperienceDTO';

export const experiencesData: ExperienceFullLangs = {
    it: {
        title: 'Esperienza',
        experiences: [
            {
                position: 'Sviluppatore Software',
                location: 'Bit S.P.A. · Torino (ibrido)',
                startDate: 'Gen 2025',
                endDate: 'Giu 2025',
                technologies: 'Java, Spring Boot, Linux, Script Bash, Dell Boomi',
                responsibilities: 'Consulenza Bit S.P.A. per il team IT di Euronics.',
                responsibilityList: [
                    'Affiancamento allo sviluppo e alla manutenzione di un sistema di logging personalizzato su server Linux.',
                    'Monitoraggio giornaliero dei processi con piccoli script per automatizzare le attività ricorrenti.',
                    'Supporto al bug fixing e a ottimizzazioni puntuali delle prestazioni.',
                    'Integrazione di aggiornamenti concordati con il team tramite Boomi.'
                ]
            },
            {
                position: 'Sviluppatore Software',
                location: 'Bit S.P.A. · Full remote',
                startDate: 'Apr 2024',
                endDate: 'Ott 2024',
                technologies: 'Spring Boot, JSP, AngularJS, Java, AMS',
                responsibilities: 'Consulenza Bit S.P.A. per Stellantis e ISP.',
                responsibilityList: [
                    'Collaborazione allo sviluppo di funzionalità su un progetto Spring Boot e JSP.',
                    'Analisi e risoluzione di bug con il supporto del team in stack AngularJS e Spring Boot.',
                    'Automazione delle attività quotidiane di AMS attraverso script in Java.'
                ]
            },
            {
                position: 'Sviluppatore Software (volontariato)',
                location: 'Empowerely · Full remote',
                startDate: 'Apr 2024',
                endDate: 'In corso',
                technologies: 'Java 24, Spring Boot, Next.js, MySQL, Dataiku',
                responsibilities: 'Collaborazione volontaria sul prodotto Empowerely.',
                responsibilityList: [
                    'Sviluppo di piccole evolutive full-stack in affiancamento al team.',
                    'Integrazione con pipeline Dataiku per preparazione e training dei modelli AI.',
                    'Aggiornamento dell’interfaccia Next.js per mostrare i dati elaborati.'
                ]
            },
            {
                position: 'Sviluppatore Software (progetto e-commerce)',
                location: 'Freelance · Full remote',
                startDate: 'Ott 2023',
                endDate: 'Apr 2024',
                technologies: 'Spring Boot, Angular, MySQL, Git, Deployment automation',
                responsibilities: 'Gestione autonoma di un progetto e-commerce per clienti freelance.',
                responsibilityList: [
                    'Gestione del ciclo di vita del progetto, del repository e delle attività di deployment.',
                    'Coordinamento del team di sviluppo e distribuzione delle attività.',
                    'Implementazione e documentazione di nuove funzionalità per progetti cliente.'
                ]
            },
            {
                position: 'Sviluppatore Software',
                location: 'Contrader · Benevento (ibrido)',
                startDate: 'Feb 2023',
                endDate: 'Ott 2023',
                technologies: 'Java, Spring Boot, MySQL, Angular, DevOps basics',
                responsibilities: 'Consulenza per progetti interni e formazione DevOps.',
                responsibilityList: [
                    'Sviluppo di soluzioni backend e frontend per progetti interni all’azienda.',
                    'Attività di bug fixing e manutenzione del codice.',
                    'Partecipazione a un corso interno di DevOps e Amministrazione di Sistemi (networking, VM, Linux, Docker, OpenShift, CI/CD, monitoraggio e logging).'
                ]
            },
            {
                position: 'Head Waiter',
                location: 'Londra · German Gymnasium / 68 & Boston / The Gun',
                startDate: 'Dic 2018',
                endDate: 'Mar 2020',
                technologies: 'Customer service, Team coordination',
                responsibilities: 'Gestione di sala e supporto al servizio in contesti ad alto ritmo.',
                responsibilityList: [
                    'Coordinamento del personale di sala durante eventi e turni serali.',
                    'Accoglienza clienti e gestione delle richieste in lingua inglese.',
                    'Supporto alle attività operative quotidiane garantendo standard elevati.'
                ]
            },
            {
                position: 'Servizio Civile Nazionale',
                location: 'ANPAS – Croce Azzurra Lotzorai',
                startDate: 'Ott 2017',
                endDate: 'Ott 2018',
                technologies: 'Volontariato, Supporto sanitario',
                responsibilities: 'Attività di volontariato per il servizio civile.',
                responsibilityList: [
                    'Supporto logistico e assistenza durante servizi di emergenza locale.',
                    'Gestione delle comunicazioni di base con il personale sanitario.',
                    'Partecipazione a iniziative di sensibilizzazione sul territorio.'
                ]
            }
        ]
    },
    en: {
        title: 'Experience',
        experiences: [
            {
                position: 'Software Developer',
                location: 'Bit S.P.A. · Turin (hybrid)',
                startDate: 'Jan 2025',
                endDate: 'Jun 2025',
                technologies: 'Java, Spring Boot, Linux, Bash scripts, Dell Boomi',
                responsibilities: 'Consultant supporting the Euronics IT team for Bit S.P.A.',
                responsibilityList: [
                    'Assisted with the development and maintenance of a custom logging system on Linux servers.',
                    'Monitored processes daily and wrote small scripts to automate recurring tasks.',
                    'Helped the team with bug fixing and focused performance improvements.',
                    'Integrated agreed updates using Boomi alongside senior developers.'
                ]
            },
            {
                position: 'Software Developer',
                location: 'Bit S.P.A. · Fully remote',
                startDate: 'Apr 2024',
                endDate: 'Oct 2024',
                technologies: 'Spring Boot, JSP, AngularJS, Java, AMS',
                responsibilities: 'Consultancy work for Stellantis and ISP.',
                responsibilityList: [
                    'Collaborated on new features for a Spring Boot and JSP project.',
                    'Investigated and fixed bugs together with the team across AngularJS and Spring Boot.',
                    'Automated routine AMS activities through Java scripts.'
                ]
            },
            {
                position: 'Software Developer (volunteer)',
                location: 'Empowerely · Fully remote',
                startDate: 'Apr 2024',
                endDate: 'Present',
                technologies: 'Java 24, Spring Boot, Next.js, MySQL, Dataiku',
                responsibilities: 'Volunteer contributor on the Empowerely product.',
                responsibilityList: [
                    'Delivered small full-stack enhancements alongside the core team.',
                    'Integrated Dataiku pipelines to prepare and train AI models.',
                    'Updated the Next.js interface to present processed data.'
                ]
            },
            {
                position: 'Software Developer (e-commerce project)',
                location: 'Freelance · Fully remote',
                startDate: 'Oct 2023',
                endDate: 'Apr 2024',
                technologies: 'Spring Boot, Angular, MySQL, Git, Deployment automation',
                responsibilities: 'Independent management of an e-commerce project for freelance clients.',
                responsibilityList: [
                    'Oversaw the project lifecycle, repository and deployment activities.',
                    'Coordinated the development team and distributed tasks.',
                    'Implemented and documented new features for client projects.'
                ]
            },
            {
                position: 'Software Developer',
                location: 'Contrader · Benevento (hybrid)',
                startDate: 'Feb 2023',
                endDate: 'Oct 2023',
                technologies: 'Java, Spring Boot, MySQL, Angular, DevOps basics',
                responsibilities: 'Consultancy on internal projects and DevOps training.',
                responsibilityList: [
                    'Developed back-end and front-end solutions for company projects.',
                    'Handled bug fixing and code maintenance tasks.',
                    'Attended an internal DevOps and systems administration course (networking, VMs, Linux, Docker, OpenShift, CI/CD, monitoring and logging).'
                ]
            },
            {
                position: 'Head Waiter',
                location: 'London · German Gymnasium / 68 & Boston / The Gun',
                startDate: 'Dec 2018',
                endDate: 'Mar 2020',
                technologies: 'Customer service, Team coordination',
                responsibilities: 'Front-of-house management in high-paced hospitality venues.',
                responsibilityList: [
                    'Coordinated floor staff during events and evening shifts.',
                    'Welcomed guests and handled requests in English.',
                    'Supported day-to-day operations while maintaining high service standards.'
                ]
            },
            {
                position: 'National Civil Service Volunteer',
                location: 'ANPAS – Croce Azzurra Lotzorai',
                startDate: 'Oct 2017',
                endDate: 'Oct 2018',
                technologies: 'Volunteering, Basic medical support',
                responsibilities: 'Volunteer activities for the national civil service programme.',
                responsibilityList: [
                    'Provided logistical support and assistance during local emergency services.',
                    'Handled basic communication with healthcare staff.',
                    'Took part in community awareness initiatives.'
                ]
            }
        ]
    }
};
