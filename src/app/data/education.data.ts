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
    }
};
