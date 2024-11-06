import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private githubApiUrl = 'https://api.github.com/repos/DiegoFCJ/DiegoFCJ/readme';
  private http = inject(HttpClient);

  getReadme(): Observable<string> {
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.github.v3.raw',
      'Authorization': `Bearer ${environment.githubApiKey}`,
    });
    return this.http.get(this.githubApiUrl, { headers, responseType: 'text' });
  }
}
