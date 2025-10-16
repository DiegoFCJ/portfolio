import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';
import { ViewportService } from '../../services/viewport.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-experiences-page',
  standalone: true,
  imports: [CommonModule, ExperiencesComponent, NavigatorComponent],
  templateUrl: './experiences.page.html',
  styleUrls: ['./experiences.page.scss']
})
export class ExperiencesPageComponent {
  protected readonly isMobileViewport$: Observable<boolean>;

  constructor(private readonly viewportService: ViewportService) {
    this.isMobileViewport$ = this.viewportService.isMobile$;
  }
}
