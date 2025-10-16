import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';
import { ViewportService } from '../../services/viewport.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, ContactMeComponent, NavigatorComponent],
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss']
})
export class ContactsPageComponent {
  protected readonly isMobileViewport$: Observable<boolean>;

  constructor(private readonly viewportService: ViewportService) {
    this.isMobileViewport$ = this.viewportService.isMobile$;
  }
}
