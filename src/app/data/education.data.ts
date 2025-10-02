import { EducationFull, EducationFullLangs } from '../dtos/EducationDTO';

const educationByLanguage: EducationFullLangs = {
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
                title: 'Boomi training & certifications',
                institution: 'Boomi',
                startDate: 'Feb 2025',
                endDate: 'Mar 2025',
                description: 'Boomi Integration Professional, API Management & API Design.'
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
                title: 'Formazione e certificazioni Boomi',
                institution: 'Boomi',
                startDate: 'Feb 2025',
                endDate: 'Mar 2025',
                description: 'Boomi Integration Professional, API Management & API Design.'
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
    },
    de: {
        title: 'Ausbildung',
        education: [
            {
                title: 'Bachelor in Informatik für digitale Unternehmen',
                institution: 'Pegaso Telematic University',
                startDate: 'Nov 2023',
                endDate: 'Laufend',
                description: 'Ein Studiengang mit Schwerpunkt auf angewandter Informatik in digitalen Unternehmen.'
            },
            {
                title: 'Cloud-Native-Entwicklung mit OpenShift und Kubernetes',
                institution: 'RedHat - Coursera',
                startDate: 'Aug 2023',
                endDate: 'Sep 2023',
                description: 'Zertifizierungskurs über cloud-native Entwicklung mit OpenShift und Kubernetes.'
            },
            {
                title: 'Boomi Schulungen und Zertifizierungen',
                institution: 'Boomi',
                startDate: 'Feb 2025',
                endDate: 'Mar 2025',
                description: 'Boomi Integration Professional, API Management & API Design.'
            },
            {
                title: 'Junior Full Stack Developer',
                institution: 'TNV Academy',
                startDate: 'Feb 2022',
                endDate: 'Dez 2022',
                description: 'Intensivkurs zu C, .NET, C#, Spring Boot, Java, Angular 14, Android und Unity.'
            },
            {
                title: 'Abitur mit naturwissenschaftlichem Schwerpunkt',
                institution: 'Liceo Scientifico A.Scorcu',
                startDate: 'Sep 2010',
                endDate: 'Jul 2016',
                description: 'Allgemeine Ausbildung mit naturwissenschaftlichem Fokus.'
            }
        ]
    },
    es: {
        title: 'Educación',
        education: [
            {
                title: 'Grado en Informática para Empresas Digitales',
                institution: 'Universidad Telemática Pegaso',
                startDate: 'Nov 2023',
                endDate: 'En curso',
                description: 'Programa centrado en informática aplicada en el contexto de los negocios digitales.'
            },
            {
                title: 'Desarrollo nativo en la nube con OpenShift y Kubernetes',
                institution: 'RedHat - Coursera',
                startDate: 'Ago 2023',
                endDate: 'Sep 2023',
                description: 'Curso de certificación sobre desarrollo nativo en la nube con OpenShift y Kubernetes.'
            },
            {
                title: 'Formación y certificaciones Boomi',
                institution: 'Boomi',
                startDate: 'Feb 2025',
                endDate: 'Mar 2025',
                description: 'Boomi Integration Professional, API Management & API Design.'
            },
            {
                title: 'Junior Full Stack Developer',
                institution: 'TNV Academy',
                startDate: 'Feb 2022',
                endDate: 'Dic 2022',
                description: 'Curso intensivo de C, .NET, C#, Spring Boot, Java, Angular 14, Android y Unity.'
            },
            {
                title: 'Bachillerato Científico',
                institution: 'Liceo Scientifico A.Scorcu',
                startDate: 'Sep 2010',
                endDate: 'Jul 2016',
                description: 'Educación general con enfoque científico y desarrollo de habilidades analíticas.'
            }
        ]
    }
};

export const educationData = educationByLanguage as EducationFullLangs & {
    education: EducationFull['education'];
    title: string;
};

(educationData as any).education = educationByLanguage.en.education;
(educationData as any).title = educationByLanguage.en.title;
