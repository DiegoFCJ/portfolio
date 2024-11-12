import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../dtos/SkillDTO';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  skills: Skill[] = [
    {
      title: "Languages & Frameworks",
      skills: [
        { name: "C#", icon: "https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white" },
        { name: "Java", icon: "https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" },
        { name: "JavaScript", icon: "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" },
        { name: "TypeScript", icon: "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" },
        { name: "Python", icon: "https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" },
        { name: "PowerShell", icon: "https://img.shields.io/badge/PowerShell-%235391FE.svg?style=for-the-badge&logo=powershell&logoColor=white" },
        { name: "Shell Script", icon: "https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white" },
        { name: "YAML", icon: "https://img.shields.io/badge/yaml-%23ffffff.svg?style=for-the-badge&logo=yaml&logoColor=151515" },
        { name: "HTML5", icon: "https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" },
      ]
    },
    {
      title: "Front-end",
      skills: [
        { name: "Angular", icon: "https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white" },
        { name: "Angular.js", icon: "https://img.shields.io/badge/angular.js-%23E23237.svg?style=for-the-badge&logo=angularjs&logoColor=white" },
        { name: "Bootstrap", icon: "https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white" },
        { name: "React", icon: "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" },
        { name: "SASS", icon: "https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" },
        { name: "CSS", icon: "https://img.shields.io/badge/CSS-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" },
        { name: "SCSS", icon: "https://img.shields.io/badge/SCSS-hotpink.svg?style=for-the-badge&logo=sass&logoColor=white" },
      ]
    },
    {
      title: "Back-end",
      skills: [
        { name: "Spring", icon: "https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" },
        { name: ".NET", icon: "https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white" },
        { name: "Hibernate", icon: "https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white" },
        { name: "Spring Boot", icon: "https://img.shields.io/badge/Spring%20Boot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white" },
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", icon: "https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" },
        { name: "Postgres", icon: "https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" },
        { name: "OracleDB", icon: "https://img.shields.io/badge/OracleDB-F80000.svg?style=for-the-badge&logo=oracle&logoColor=white" },
      ]
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Docker", icon: "https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" },
        { name: "Kubernetes", icon: "https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white" },
        { name: "OpenShift", icon: "https://img.shields.io/badge/OpenShift-EE0000.svg?style=for-the-badge&logo=redhatopenshift&logoColor=white" },
        { name: "Windows Terminal", icon: "https://img.shields.io/badge/Windows%20Terminal-%234D4D4D.svg?style=for-the-badge&logo=windows-terminal&logoColor=white" },
      ]
    },
    {
      title: "Versioning",
      skills: [
        { name: "GitHub", icon: "https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" },
        { name: "GitLab", icon: "https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white" },
        { name: "Bitbucket", icon: "https://img.shields.io/badge/Bitbucket-%230047B3.svg?style=for-the-badge&logo=bitbucket&logoColor=white" },
      ]
    },
    {
      title: "Project Management & Collaboration",
      skills: [
        { name: "Trello", icon: "https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white" },
        { name: "Notion", icon: "https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white" },
        { name: "Jira", icon: "https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white" },
      ]
    },
    {
      title: "Other Tools",
      skills: [
        { name: "Swagger", icon: "https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white" },
        { name: "Postman", icon: "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" },
        { name: "Gradle", icon: "https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white" },
        { name: "Apache Maven", icon: "https://img.shields.io/badge/Apache%20Maven-C71A36?style=for-the-badge&logo=Apache%20Maven&logoColor=white" },
      ]
    }
  ];

  sections: { title: string; skills: { name: string; icon: string }[] }[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.sections = this.skills;
    this.loading = false;
  }
}