
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [GithubService],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  sections: { title: string, skills: string[] }[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.githubService.getReadme().subscribe(
      (response: { readme: string }) => {
        const content = response.readme;
        console.log('Contenuto del README:', content);
        // Altri log per controllare il formato
        this.sections = [
          { title: 'Languages & Frameworks', skills: this.githubService.extractSection(content, 'Languages & Frameworks') },
          { title: 'Front-end', skills: this.githubService.extractSection(content, 'Front-end') },
          { title: 'Back-end', skills: this.githubService.extractSection(content, 'Back-end') },
          { title: 'Databases', skills: this.githubService.extractSection(content, 'Databases') },
          { title: 'Tools & Platforms', skills: this.githubService.extractSection(content, 'Tools & Platforms') },
          { title: 'Versioning', skills: this.githubService.extractSection(content, 'Versioning') },
          { title: 'Project Management & Collaboration', skills: this.githubService.extractSection(content, 'Project Management & Collaboration') },
          { title: 'Other Tools', skills: this.githubService.extractSection(content, 'Other Tools') },
        ];
      },
      (error) => {
        console.error('Errore durante il caricamento del README:', error);
      }
    );   
  }
}
