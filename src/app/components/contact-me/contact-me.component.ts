import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SocialComponent } from '../social/social.component';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { contactMeData } from '../../data/contact-me.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ContactMe } from '../../dtos/ContactMeDTO';
import { EmailService } from '../../services/email.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [
    SocialComponent,
    CustomPopupComponent,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent {
  contactMe!: ContactMe;
  popupMessage: string = '';
  @ViewChild(CustomPopupComponent) customPopup: CustomPopupComponent | undefined;

  constructor(private emailService: EmailService, private translationService: TranslationService) {
    this.translationService.currentLanguage$.subscribe(language => {
      this.contactMe = this.translationService.getTranslatedData<ContactMe>(contactMeData);
    });    
  }

  /**
   * Handles form submission. Validates and sends email if everything is valid.
   * @param form The form data submitted by the user.
   */
  onSubmit(form: any): void {
    if (!this.emailService.canSubmitMessage()) {
      this.showPopup(this.contactMe.emailMessages.find(msg => msg.keyMess === 'one-each-two')?.valueMess || '');
      return;
    }

    if (!form || !form.name || !form.email || !form.message) {
      console.error(this.contactMe.emailMessages.find(msg => msg.keyMess === 'form-miss')?.valueMess || '');
      this.showPopup(this.contactMe.emailMessages.find(msg => msg.keyMess === 'all-field-req')?.valueMess || '');
      return;
    }

    if (!this.emailService.isValidEmail(form.email)) {
      this.showPopup(this.contactMe.emailMessages.find(msg => msg.keyMess === 'email-valid')?.valueMess || '');
      return;
    }

    if (!this.emailService.isMessageValid(form.message)) {
      this.showPopup(this.contactMe.emailMessages.find(msg => msg.keyMess === 'ten-char-mess')?.valueMess || '');
      return;
    }

    this.emailService.sendEmail(form)
      .then((response) => {
        if (response.ok) {
          this.emailService.recordSubmissionTime(); // Record submission time on success
          this.showPopup(this.contactMe.emailMessages.find(msg => msg.keyMess === 'success')?.valueMess || '');
        } else {
          this.showPopup(this.contactMe.emailMessages.find(msg => msg.keyMess === 'fail-retry')?.valueMess || '');
          console.error(this.contactMe.emailMessages.find(msg => msg.keyMess === 'form-miss')?.valueMess || '', response);
        }
      })
      .catch((error) => {
        this.showPopup(this.contactMe.emailMessages.find(msg => msg.keyMess === 'err-sending')?.valueMess || '');
        console.error(this.contactMe.emailMessages.find(msg => msg.keyMess === 'form-miss')?.valueMess || '', error);
      });
  }

  /**
   * Shows a popup with the provided message.
   * @param message The message to display in the popup.
   */
  showPopup(message: string): void {
    if (this.customPopup) {
      this.customPopup.togglePopup(message);
    }
  }
}
