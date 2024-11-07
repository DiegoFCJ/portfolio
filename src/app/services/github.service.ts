import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment'; // Importa l'ambiente

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly GITHUB_README_URL = 'https://api.github.com/repos/DiegoFCJ/DiegoFCJ/readme';
  private readonly GITHUB_TOKEN = environment.githubToken; // Usa il token dall'ambiente

  constructor(private http: HttpClient) {}

  // Funzione per ottenere il contenuto del README
  getReadme(): Observable<{ readme: string }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3.raw',
    });

    return this.http.get(this.GITHUB_README_URL, { headers, responseType: 'text' })
      .pipe(
        map((response) => ({ readme: response as string })), // Mappa la risposta al formato desiderato
        catchError(error => {
          console.error('Errore nel recupero del README:', error);
          return throwError(() => new Error('Errore nel recupero del README'));
        })
      );
  }

  // Funzione per estrarre una sezione specifica dal README
  extractSection(content: string, section: string): string[] {
    const sectionRegex = new RegExp(`### ${section}[\\s\\S]*?(?=###|$)`, 'g');
    const sectionMatch = content.match(sectionRegex);

    if (sectionMatch) {
      const badgeRegex = /!\[([^\]]+)\]\([^\)]+\)/g;
      const matches = sectionMatch[0].match(badgeRegex);

      return matches ? matches.map(match => {
        const skillNameMatch = match.match(/!\[([^\]]+)\]/);
        return skillNameMatch ? skillNameMatch[1] : '';
      }).filter(skill => skill) : [];
    }

    return [];
  }
}
