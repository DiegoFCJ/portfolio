import { SkillFull } from '../dtos/SkillDTO';

export const skills: SkillFull = {
    title: {
        en: "Tech Stack",
        it: "Stack Tecnologico"
    },
    skills: [
        {
            title: {
                en: "Languages & Frameworks",
                it: "Linguaggi & Framework"
            },
            skills: [
                { name: "Java", icon: "https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white", clicked: false },
                { name: "JavaScript", icon: "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E", clicked: false },
                { name: "TypeScript", icon: "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white", clicked: false },
                { name: "Python", icon: "https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54", clicked: false },
                { name: "HTML5", icon: "https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white", clicked: false }
            ]
        },
        {
            title: {
                en: "Front-end",
                it: "Front-end"
            },
            skills: [
                { name: "Angular", icon: "https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white", clicked: false },
                { name: "Bootstrap", icon: "https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white", clicked: false },
                { name: "React", icon: "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB", clicked: false },
                { name: "CSS", icon: "https://img.shields.io/badge/CSS-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white", clicked: false },
                { name: "SCSS", icon: "https://img.shields.io/badge/SCSS-hotpink.svg?style=for-the-badge&logo=sass&logoColor=white", clicked: false }
            ]
        },
        {
            title: {
                en: "Back-end",
                it: "Back-end"
            },
            skills: [
                { name: "Spring", icon: "https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white", clicked: false },
                { name: "Hibernate", icon: "https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white", clicked: false },
                { name: "Spring Boot", icon: "https://img.shields.io/badge/Spring%20Boot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white", clicked: false }
            ]
        },
        {
            title: {
                en: "Database",
                it: "Database"
            },
            skills: [
                { name: "MySQL", icon: "https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white", clicked: false },
                { name: "PostgreSQL", icon: "https://img.shields.io/badge/postgreSQL-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white", clicked: false },
                { name: "OracleDB", icon: "https://img.shields.io/badge/OracleDB-F80000.svg?style=for-the-badge&logo=oracle&logoColor=white", clicked: false }
            ]
        },
        {
            title: {
                en: "Tools & Platforms",
                it: "Piattaforme e Strumenti"
            },
            skills: [
                { name: "Docker", icon: "https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white", clicked: false },
                { name: "Kubernetes", icon: "https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white", clicked: false },
                { name: "OpenShift", icon: "https://img.shields.io/badge/OpenShift-EE0000.svg?style=for-the-badge&logo=redhatopenshift&logoColor=white", clicked: false }
            ]
        },
        {
            title: {
                en: "Versioning",
                it: "Versionamento"
            },
            skills: [
                { name: "GitHub", icon: "https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white", clicked: false },
                { name: "GitLab", icon: "https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white", clicked: false },
                { name: "Bitbucket", icon: "https://img.shields.io/badge/Bitbucket-%230047B3.svg?style=for-the-badge&logo=bitbucket&logoColor=white", clicked: false },
            ]
        },
        {
            title: {
                en: "Management",
                it: "Gestione"
            },
            skills: [
                { name: "Trello", icon: "https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white", clicked: false },
                { name: "Jira", icon: "https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white", clicked: false },
            ]
        },
        {
            title: {
                en: "Operative Systems",
                it: "Sistemi Operativi"
            },
            skills: [
                { name: "Fedora", icon: "https://img.shields.io/badge/Fedora-294172?style=for-the-badge&logo=fedora&logoColor=white", clicked: false },
                { name: "Ubuntu", icon: "https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white", clicked: false },
                { name: "Windows", icon: "https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white", clicked: false },
                { name: "Linux", icon: "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black", clicked: false }
            ]
        },
        {
            title: {
                en: "Other",
                it: "Altro"
            },
            skills: [
                { name: "Salesforce", icon: "https://img.shields.io/badge/Salesforce-00A1E0?style=for-the-badge&logo=salesforce&logoColor=white", clicked: false },
                { name: "Elastic", icon: "https://img.shields.io/badge/Elastic-005571?style=for-the-badge&logo=elastic&logoColor=white", clicked: false },
                { name: "Boomi", icon: "https://img.shields.io/badge/Boomi-1E90FF?style=for-the-badge&logo=boomi&logoColor=white", clicked: false },
                { name: "Swagger", icon: "https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black", clicked: false },
                { name: "Postman", icon: "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white", clicked: false },
                { name: "Gradle", icon: "https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=gradle&logoColor=white", clicked: false },
                { name: "Apache Maven", icon: "https://img.shields.io/badge/Apache%20Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white", clicked: false },
                { name: "Notion", icon: "https://img.shields.io/badge/Notion-000000.svg?style=for-the-badge&logo=notion&logoColor=white", clicked: false }
            ]

        }
    ]
}