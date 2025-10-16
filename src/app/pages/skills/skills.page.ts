import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from '../../components/skills/skills.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';
import { ViewportService } from '../../services/viewport.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [CommonModule, SkillsComponent, NavigatorComponent],
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss']
})
export class SkillsPageComponent {
  protected readonly isMobileViewport$: Observable<boolean>;

  constructor(private readonly viewportService: ViewportService) {
    this.isMobileViewport$ = this.viewportService.isMobile$;
  }
}
