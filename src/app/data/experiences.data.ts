import { ExperienceFullLangs } from '../dtos/ExperienceDTO';

export const experiencesData: ExperienceFullLangs = {
    en: {
        title: 'Experience',
        experiences: [
            {
                position: 'Junior Java Angular Developer',
                location: 'Dedagroup Business Technology & Data, Milan',
                startDate: 'Jan 2024',
                endDate: 'Current',
                technologies: 'Java, Spring Boot, Angular, MySQL, Docker, OpenShift',
                responsibilities: 'Developing and maintaining web applications, ensuring scalability, reliability, and performance.'
            },
            {
                position: 'Boomi Integration Developer',
                location: 'Dedagroup Business Technology & Data, Milan',
                startDate: 'Jul 2024',
                endDate: 'Current',
                technologies: 'Boomi, APIs, Integrations',
                responsibilities: 'Designing, developing, and maintaining Boomi integrations to support business processes and data flows.'
            },
            {
                position: 'Retail Operations Specialist',
                location: 'Various companies, London',
                startDate: 'May 2018',
                endDate: 'Dec 2021',
                responsibilities: 'Managed operations in high-paced retail environments, achieving 30% sales growth and improving logistics and staff management.'
            }
        ]
    }
};
