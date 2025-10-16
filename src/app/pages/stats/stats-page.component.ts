import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatsComponent } from '../../components/stats/stats.component';
import { SectionPageShellComponent } from '../shared/section-page-shell/section-page-shell.component';

@Component({
  selector: 'app-stats-page',
  standalone: true,
  imports: [CommonModule, SectionPageShellComponent, StatsComponent],
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsPageComponent {}
