import { EducationFullLangs } from '../dtos/EducationDTO';

export const educationData: EducationFullLangs = {
    en: {
        title: 'Education',
        education: [
            {
                title: 'Cloud-Native Development with OpenShift and Kubernetes',
                institution: 'RedHat - Coursera',
                startDate: 'Aug 2023',
                endDate: 'Sep 2023',
                description: 'Certification program with hands-on labs on OpenShift and Kubernetes, focusing on container orchestration, CI/CD automation, and resilient application deployment in cloud environments.'
            },
            {
                title: 'Boomi training & certifications',
                institution: 'Boomi',
                startDate: 'Feb 2025',
                endDate: 'Mar 2025',
                description: 'Completed Boomi Integration Professional and API Management certifications, designing and governing integrations and APIs across hybrid environments.'
            },
            {
                title: 'Junior Full Stack Developer',
                institution: 'TNV Academy',
                startDate: 'Feb 2022',
                endDate: 'Dec 2022',
                description: 'Intensive full-stack bootcamp covering C, .NET, C#, Spring Boot, Java, Angular 14, Android, and Unity, with project work on end-to-end application development.'
            },
            {
                title: 'High School Diploma in Scientific Studies',
                institution: 'Liceo Scientifico A.Scorcu',
                startDate: 'Sep 2010',
                endDate: 'Jul 2016',
                description: 'Scientific-track diploma with advanced mathematics, physics, and laboratory studies, strengthening analytical and problem-solving skills.'
            }
        ]
    },
    it: {
        title: 'Formazione',
        education: [
            {
                title: 'Sviluppo cloud-native con OpenShift e Kubernetes',
                institution: 'RedHat - Coursera',
                startDate: 'Aug 2023',
                endDate: 'Sep 2023',
                description: "Programma di certificazione con laboratori pratici su OpenShift e Kubernetes, incentrato su orchestrazione dei container, automazione CI/CD e distribuzione resiliente delle applicazioni in ambienti cloud."
            },
            {
                title: 'Formazione e certificazioni Boomi',
                institution: 'Boomi',
                startDate: 'Feb 2025',
                endDate: 'Mar 2025',
                description: 'Completate le certificazioni Boomi Integration Professional e API Management, progettando e governando integrazioni e API in ambienti ibridi.'
            },
            {
                title: 'Sviluppatore Full Stack Junior',
                institution: 'TNV Academy',
                startDate: 'Feb 2022',
                endDate: 'Dec 2022',
                description: 'Bootcamp full-stack intensivo che copre C, .NET, C#, Spring Boot, Java, Angular 14, Android e Unity, con project work sullo sviluppo end-to-end di applicazioni.'
            },
            {
                title: 'Diploma di maturità scientifica',
                institution: 'Liceo Scientifico A.Scorcu',
                startDate: 'Sep 2010',
                endDate: 'Jul 2016',
                description: 'Percorso scientifico con approfondimenti in matematica avanzata, fisica e laboratori, per rafforzare capacità analitiche e di problem solving.'
            }
        ]
    }
};
