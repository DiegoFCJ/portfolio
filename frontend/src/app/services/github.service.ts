import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GithubService {

  constructor(private http: HttpClient) {}

  getReadme(): Observable<{ readme: string }> {
    return this.http.get<{ readme: string }>(`${environment.githubApiKey}readme`, { responseType: 'json' });
  }
  

  /**
   * Estrae una sezione specifica dal README.
   * @param content Contenuto del README come stringa
   * @param section Titolo della sezione da estrarre (es: "Languages & Frameworks")
   * @returns Un array di stringhe con i nomi delle skill o badge all'interno della sezione.
   */
  extractSection(content: string, section: string): string[] {
    // Trova la sezione basata sul titolo specifico (ad esempio, "### Languages & Frameworks")
    const sectionRegex = new RegExp(`### ${section}[\\s\\S]*?(?=###|$)`, 'g');
    const sectionMatch = content.match(sectionRegex);

    if (sectionMatch) {
      // Cattura tutti i badge markdown
      const badgeRegex = /!\[([^\]]+)\]\([^\)]+\)/g;
      const matches = sectionMatch[0].match(badgeRegex);

      return matches ? matches.map((match) => {
        const skillNameMatch = match.match(/!\[([^\]]+)\]/);
        return skillNameMatch ? skillNameMatch[1] : '';
      }).filter(skill => skill) : [];
    }

    return [];
  }
}
