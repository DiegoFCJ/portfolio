import { SkillFullLangs } from '../dtos/SkillDTO';

export const skills: SkillFullLangs = {
    it: {
        title: 'Competenze',
        skills: [
            {
                title: 'Lingue',
                skills: [
                    { name: 'Italiano · madrelingua', icon: 'https://img.shields.io/badge/Italiano-Madrelingua-008C45?style=for-the-badge&labelColor=F4F5F0', clicked: false },
                    { name: 'Inglese · livello C1', icon: 'https://img.shields.io/badge/Inglese-C1-1F75FE?style=for-the-badge&labelColor=F4F5F0', clicked: false }
                ]
            },
            {
                title: 'Sistemi operativi',
                skills: [
                    { name: 'Linux (Fedora, Ubuntu)', icon: 'https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=000000', clicked: false },
                    { name: 'Windows', icon: 'https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'Version control',
                skills: [
                    { name: 'Git', icon: 'https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white', clicked: false },
                    { name: 'GitHub', icon: 'https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white', clicked: false },
                    { name: 'GitLab', icon: 'https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white', clicked: false },
                    { name: 'Bitbucket', icon: 'https://img.shields.io/badge/Bitbucket-%230047B3.svg?style=for-the-badge&logo=bitbucket&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'Backend',
                skills: [
                    { name: 'Java', icon: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white', clicked: false },
                    { name: 'Spring Boot', icon: 'https://img.shields.io/badge/Spring%20Boot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'Frontend',
                skills: [
                    { name: 'Angular', icon: 'https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white', clicked: false },
                    { name: 'React', icon: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB', clicked: false },
                    { name: 'Next.js', icon: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white', clicked: false },
                    { name: 'JavaScript', icon: 'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E', clicked: false },
                    { name: 'TypeScript', icon: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white', clicked: false },
                    { name: 'HTML', icon: 'https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white', clicked: false },
                    { name: 'CSS / SCSS', icon: 'https://img.shields.io/badge/SCSS-hotpink.svg?style=for-the-badge&logo=sass&logoColor=white', clicked: false },
                    { name: 'JSP', icon: 'https://img.shields.io/badge/JSP-007396?style=for-the-badge&logo=java&logoColor=white', clicked: false },
                    { name: 'jQuery', icon: 'https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'Database',
                skills: [
                    { name: 'MySQL', icon: 'https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white', clicked: false },
                    { name: 'PostgreSQL', icon: 'https://img.shields.io/badge/postgreSQL-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white', clicked: false },
                    { name: 'OracleDB', icon: 'https://img.shields.io/badge/OracleDB-F80000.svg?style=for-the-badge&logo=oracle&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'Container e cloud',
                skills: [
                    { name: 'Docker', icon: 'https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white', clicked: false },
                    { name: 'OpenShift', icon: 'https://img.shields.io/badge/OpenShift-EE0000.svg?style=for-the-badge&logo=redhatopenshift&logoColor=white', clicked: false },
                    { name: 'Heroku', icon: 'https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white', clicked: false },
                    { name: 'Firebase', icon: 'https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black', clicked: false }
                ]
            },
            {
                title: 'Testing e API',
                skills: [
                    { name: 'Postman', icon: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white', clicked: false },
                    { name: 'Swagger', icon: 'https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black', clicked: false }
                ]
            },
            {
                title: 'Build e sicurezza',
                skills: [
                    { name: 'Maven', icon: 'https://img.shields.io/badge/Apache%20Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white', clicked: false },
                    { name: 'Gradle', icon: 'https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=gradle&logoColor=white', clicked: false },
                    { name: 'JWT', icon: 'https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white', clicked: false },
                    { name: 'Argon2', icon: 'https://img.shields.io/badge/Argon2-4E4E50?style=for-the-badge&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'Integrazione e automazione',
                skills: [
                    { name: 'Boomi', icon: 'https://img.shields.io/badge/Boomi-1E90FF?style=for-the-badge&logo=boomi&logoColor=white', clicked: false },
                    { name: 'Salesforce', icon: 'https://img.shields.io/badge/Salesforce-00A1E0?style=for-the-badge&logo=salesforce&logoColor=white', clicked: false },
                    { name: 'Elastic', icon: 'https://img.shields.io/badge/Elastic-005571?style=for-the-badge&logo=elastic&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'UI e UX',
                skills: [
                    { name: 'SweetAlert', icon: 'https://img.shields.io/badge/SweetAlert-FF96C5?style=for-the-badge&logoColor=white', clicked: false }
                ]
            }
        ]
    },
    en: {
        title: 'Skills',
        skills: [
            {
                title: 'Languages',
                skills: [
                    { name: 'Italian · native', icon: 'https://img.shields.io/badge/Italian-Native-008C45?style=for-the-badge&labelColor=F4F5F0', clicked: false },
                    { name: 'English · C1', icon: 'https://img.shields.io/badge/English-C1-1F75FE?style=for-the-badge&labelColor=F4F5F0', clicked: false }
                ]
            },
            {
                title: 'Operating systems',
                skills: [
                    { name: 'Linux (Fedora, Ubuntu)', icon: 'https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=000000', clicked: false },
                    { name: 'Windows', icon: 'https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'Version control',
                skills: [
                    { name: 'Git', icon: 'https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white', clicked: false },
                    { name: 'GitHub', icon: 'https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white', clicked: false },
                    { name: 'GitLab', icon: 'https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white', clicked: false },
                    { name: 'Bitbucket', icon: 'https://img.shields.io/badge/Bitbucket-%230047B3.svg?style=for-the-badge&logo=bitbucket&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'Backend',
                skills: [
                    { name: 'Java', icon: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white', clicked: false },
                    { name: 'Spring Boot', icon: 'https://img.shields.io/badge/Spring%20Boot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'Frontend',
                skills: [
                    { name: 'Angular', icon: 'https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white', clicked: false },
                    { name: 'React', icon: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB', clicked: false },
                    { name: 'Next.js', icon: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white', clicked: false },
                    { name: 'JavaScript', icon: 'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E', clicked: false },
                    { name: 'TypeScript', icon: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white', clicked: false },
                    { name: 'HTML', icon: 'https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white', clicked: false },
                    { name: 'CSS / SCSS', icon: 'https://img.shields.io/badge/SCSS-hotpink.svg?style=for-the-badge&logo=sass&logoColor=white', clicked: false },
                    { name: 'JSP', icon: 'https://img.shields.io/badge/JSP-007396?style=for-the-badge&logo=java&logoColor=white', clicked: false },
                    { name: 'jQuery', icon: 'https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'Databases',
                skills: [
                    { name: 'MySQL', icon: 'https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white', clicked: false },
                    { name: 'PostgreSQL', icon: 'https://img.shields.io/badge/postgreSQL-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white', clicked: false },
                    { name: 'OracleDB', icon: 'https://img.shields.io/badge/OracleDB-F80000.svg?style=for-the-badge&logo=oracle&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'Container & cloud',
                skills: [
                    { name: 'Docker', icon: 'https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white', clicked: false },
                    { name: 'OpenShift', icon: 'https://img.shields.io/badge/OpenShift-EE0000.svg?style=for-the-badge&logo=redhatopenshift&logoColor=white', clicked: false },
                    { name: 'Heroku', icon: 'https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white', clicked: false },
                    { name: 'Firebase', icon: 'https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black', clicked: false }
                ]
            },
            {
                title: 'Testing & APIs',
                skills: [
                    { name: 'Postman', icon: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white', clicked: false },
                    { name: 'Swagger', icon: 'https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black', clicked: false }
                ]
            },
            {
                title: 'Build & security',
                skills: [
                    { name: 'Maven', icon: 'https://img.shields.io/badge/Apache%20Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white', clicked: false },
                    { name: 'Gradle', icon: 'https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=gradle&logoColor=white', clicked: false },
                    { name: 'JWT', icon: 'https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white', clicked: false },
                    { name: 'Argon2', icon: 'https://img.shields.io/badge/Argon2-4E4E50?style=for-the-badge&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'Integration & automation',
                skills: [
                    { name: 'Boomi', icon: 'https://img.shields.io/badge/Boomi-1E90FF?style=for-the-badge&logo=boomi&logoColor=white', clicked: false },
                    { name: 'Salesforce', icon: 'https://img.shields.io/badge/Salesforce-00A1E0?style=for-the-badge&logo=salesforce&logoColor=white', clicked: false },
                    { name: 'Elastic', icon: 'https://img.shields.io/badge/Elastic-005571?style=for-the-badge&logo=elastic&logoColor=white', clicked: false }
                ]
            },
            {
                title: 'UI & UX',
                skills: [
                    { name: 'SweetAlert', icon: 'https://img.shields.io/badge/SweetAlert-FF96C5?style=for-the-badge&logoColor=white', clicked: false }
                ]
            }
        ]
    }
};
