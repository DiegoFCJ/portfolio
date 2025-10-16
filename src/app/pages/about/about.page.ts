import { Component } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';
import { SectionPageShellComponent } from '../shared/section-page-shell.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [SectionPageShellComponent, AboutComponent],
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPageComponent {
  readonly previousRoute = '/';
  readonly nextRoute = '/projects';
}
