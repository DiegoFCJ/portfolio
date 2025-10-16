import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';
import { SectionPageShellComponent } from '../shared/section-page-shell/section-page-shell.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, SectionPageShellComponent, ContactMeComponent],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {}
