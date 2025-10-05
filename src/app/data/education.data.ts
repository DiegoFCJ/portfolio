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
    }
};
