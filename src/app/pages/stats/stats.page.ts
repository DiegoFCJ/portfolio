import { Component } from '@angular/core';
import { StatsComponent } from '../../components/stats/stats.component';
import { SectionPageShellComponent } from '../shared/section-page-shell.component';

@Component({
  selector: 'app-stats-page',
  standalone: true,
  imports: [SectionPageShellComponent, StatsComponent],
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss']
})
export class StatsPageComponent {
  readonly previousRoute = '/experiences';
  readonly nextRoute = '/contact';
}
