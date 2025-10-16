import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';
import { ViewportService } from '../../services/viewport.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, ProjectsComponent, NavigatorComponent],
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss']
})
export class ProjectsPageComponent {
  protected readonly isMobileViewport$: Observable<boolean>;

  constructor(private readonly viewportService: ViewportService) {
    this.isMobileViewport$ = this.viewportService.isMobile$;
  }
}
