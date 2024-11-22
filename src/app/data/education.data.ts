import { EducationFullLangs } from '../dtos/EducationDTO';

export const educationData: EducationFullLangs = {
    en: {
        title: 'Education',
        education: [
            {
                title: 'Bachelor\'s Degree in Computer Science for Digital Businesses',
                institution: 'Pegaso Telematic University',
                startDate: 'Nov 2023',
                endDate: 'Ongoing',
                description: 'A program focused on applied computer science in the context of digital businesses, emphasizing data management, software development, and digital technologies for enterprises.'
            },
            {
                title: 'Cloud-Native Development with OpenShift and Kubernetes',
                institution: 'RedHat - Coursera',
                startDate: 'Aug 2023',
                endDate: 'Sep 2023',
                description: 'Certification program covering cloud-native development with OpenShift and Kubernetes, essential skills for managing and deploying applications in cloud environments.'
            },
            {
                title: 'Junior Full Stack Developer',
                institution: 'TNV Academy',
                startDate: 'Feb 2022',
                endDate: 'Dec 2022',
                description: 'An intensive course focusing on C, .NET, C#, Spring Boot, Java, Angular 14, Android, and Unity, providing a strong foundation for full-stack development.'
            },
            {
                title: 'High School Diploma in Scientific Studies',
                institution: 'Liceo Scientifico A.Scorcu',
                startDate: 'Sep 2010',
                endDate: 'Jul 2016',
                description: 'A general education with a scientific focus, developing analytical and problem-solving skills.'
            }
        ]
    },
    it: {
        title: 'Formazione',
        education: [
            {
                title: 'Laurea Triennale in Informatica per le Aziende Digitali',
                institution: 'Università Telematica Pegaso',
                startDate: 'Nov 2023',
                endDate: 'In corso',
                description: 'Un programma incentrato sull\'informatica applicata nel contesto delle aziende digitali, con enfasi sulla gestione dei dati, sviluppo software e tecnologie digitali per le imprese.'
            },
            {
                title: 'Sviluppo Cloud-Nativo con OpenShift e Kubernetes',
                institution: 'RedHat - Coursera',
                startDate: 'Ago 2023',
                endDate: 'Set 2023',
                description: 'Programma di certificazione su sviluppo cloud-nativo con OpenShift e Kubernetes, competenze essenziali per gestire e distribuire applicazioni in ambienti cloud.'
            },
            {
                title: 'Junior Full Stack Developer',
                institution: 'TNV Academy',
                startDate: 'Feb 2022',
                endDate: 'Dic 2022',
                description: 'Un corso intensivo focalizzato su C, .NET, C#, Spring Boot, Java, Angular 14, Android e Unity, fornendo una solida base per lo sviluppo full-stack.'
            },
            {
                title: 'Diploma di Maturità Scientifica',
                institution: 'Liceo Scientifico A.Scorcu',
                startDate: 'Set 2010',
                endDate: 'Lug 2016',
                description: 'Un\'educazione generale con un focus scientifico, sviluppando capacità analitiche e di risoluzione dei problemi.'
            }
        ]
    }
};