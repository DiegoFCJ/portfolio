import { EducationFullLangs } from '../dtos/EducationDTO';

export const educationData: EducationFullLangs = {
    it: {
        title: 'Formazione',
        education: [
            {
                title: 'Formazione e certificazioni Boomi',
                institution: 'Boomi',
                startDate: 'Feb 2025',
                endDate: 'Mar 2025',
                description: 'Percorso Boomi Integration Professional, API Management e API Design con focus su progettazione di integrazioni e gestione delle API in ambienti ibridi.'
            },
            {
                title: 'Sviluppo cloud-native con OpenShift e Kubernetes',
                institution: 'Red Hat - Coursera',
                startDate: 'Ago 2023',
                endDate: 'Set 2023',
                description: 'Corso pratico su orchestrazione dei container, gestione delle applicazioni su OpenShift e introduzione a pipeline CI/CD.'
            },
            {
                title: 'Junior Full Stack Developer',
                institution: 'TNV Academy',
                startDate: 'Feb 2022',
                endDate: 'Dic 2022',
                description: 'Bootcamp full-stack junior su C, C#, .NET, Java, Spring Boot, Angular, React, Node.js, Android e Unity, con project work finale.'
            },
            {
                title: 'Diploma di Liceo Scientifico',
                institution: 'Liceo Scientifico A. Scorcu',
                startDate: 'Set 2010',
                endDate: 'Lug 2016',
                description: 'Diploma scientifico con approfondimenti di matematica, fisica e laboratori, rafforzando le capacità analitiche.'
            }
        ]
    },
    en: {
        title: 'Education',
        education: [
            {
                title: 'Boomi training & certifications',
                institution: 'Boomi',
                startDate: 'Feb 2025',
                endDate: 'Mar 2025',
                description: 'Completed Integration Professional, API Management and API Design certifications with a focus on hybrid integrations and API governance.'
            },
            {
                title: 'Cloud-Native Development with OpenShift and Kubernetes',
                institution: 'RedHat - Coursera',
                startDate: 'Aug 2023',
                endDate: 'Sep 2023',
                description: 'Hands-on course covering container orchestration, OpenShift application management, and introductory CI/CD pipelines.'
            },
            {
                title: 'Junior Full Stack Developer',
                institution: 'TNV Academy',
                startDate: 'Feb 2022',
                endDate: 'Dec 2022',
                description: 'Junior full-stack bootcamp covering C, C#, .NET, Java, Spring Boot, Angular, React, Node.js, Android, and Unity, completed with a capstone project.'
            },
            {
                title: 'High School Diploma in Scientific Studies',
                institution: 'Liceo Scientifico A.Scorcu',
                startDate: 'Sep 2010',
                endDate: 'Jul 2016',
                description: 'Scientific-track diploma with advanced mathematics, physics, and lab activities that strengthened analytical skills.'
            }
        ]
    }
};
