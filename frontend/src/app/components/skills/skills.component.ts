// src/app/components/skills/skills.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { HttpClientModule } from '@angular/common/http';
import { GithubEasyService } from '../../utils/github-easy.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [GithubService, GithubEasyService],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  sections: { title: string, skills: string[] }[] = [];

  constructor(private githubService: GithubService, private githubEasyService: GithubEasyService) {}

  ngOnInit(): void {
    this.githubService.getReadme().subscribe(
      (content) => {
        this.sections = [
          { title: 'Languages & Frameworks', skills: this.githubEasyService.extractSection(content, 'Languages & Frameworks') },
          { title: 'Front-end', skills: this.githubEasyService.extractSection(content, 'Front-end') },
          { title: 'Back-end', skills: this.githubEasyService.extractSection(content, 'Back-end') },
          { title: 'Databases', skills: this.githubEasyService.extractSection(content, 'Databases') },
          { title: 'Tools & Platforms', skills: this.githubEasyService.extractSection(content, 'Tools & Platforms') },
          { title: 'Versioning', skills: this.githubEasyService.extractSection(content, 'Versioning') },
          { title: 'Project Management & Collaboration', skills: this.githubEasyService.extractSection(content, 'Project Management & Collaboration') },
          { title: 'Other Tools', skills: this.githubEasyService.extractSection(content, 'Other Tools') },
        ];
      },
      (error) => {
        console.error('Errore durante il caricamento delle skill:', error);
      }
    );
  }
}
