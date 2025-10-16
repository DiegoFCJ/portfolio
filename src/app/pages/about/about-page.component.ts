import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';
import { SectionPageShellComponent } from '../shared/section-page-shell/section-page-shell.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, SectionPageShellComponent, AboutComponent],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {}
