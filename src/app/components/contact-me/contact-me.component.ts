import { Component, ViewEncapsulation, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { SocialComponent } from '../social/social.component';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { contactMeData } from '../../data/contact-me.data';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, NgForm } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ContactMe } from '../../dtos/ContactMeDTO';
import { EmailService } from '../../services/email.service';
import { TranslationService } from '../../services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

enum ContactFormStatus {
  Idle = 'idle',
  Success = 'success',
  Warning = 'warning',
  Error = 'error'
}

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
    TextFieldModule,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit, OnDestroy {
  contactMe: ContactMe = {
    title: '',
    name: '',
    nameReq: '',
    email: '',
    emailReq: '',
    message: '',
    messageReq: '',
    sendBtn: '',
    emailMessages: [{
      keyMess: '',
      valueMess: ''
    }]
  };

  popupMessage: string = '';
  isLoading = true;
  statusMessage: string | null = null;
  currentStatus: ContactFormStatus = ContactFormStatus.Idle;
  readonly ContactFormStatus = ContactFormStatus;
  readonly isFormspreeConfigured = this.emailService.isConfigured();

  private readonly destroy$ = new Subject<void>();
  private statusKey: string | null = null;
  @ViewChild(CustomPopupComponent) customPopup: CustomPopupComponent | undefined;

  constructor(private emailService: EmailService, private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isLoading = true;
      });

    this.translationService.getTranslatedData<ContactMe>(contactMeData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.contactMe = data;
        this.handleFormspreeConfiguration();
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handles form submission. Validates and sends email if everything is valid.
   * @param form The form data submitted by the user.
   */
  onSubmit(form: NgForm): void {
    if (!form) {
      return;
    }

    if (!this.isFormspreeConfigured) {
      const message = this.setStatus(ContactFormStatus.Warning, 'formspree-disabled');
      this.showPopup(message);
      return;
    }

    if (!this.emailService.canSubmitMessage()) {
      const message = this.setStatus(ContactFormStatus.Warning, 'one-each-two');
      this.showPopup(message);
      return;
    }

    const { name, email, message } = form.value ?? {};

    if (!name || !email || !message) {
      this.markAllControlsAsTouched(form);
      const statusMessage = this.setStatus(ContactFormStatus.Error, 'all-field-req');
      this.showPopup(statusMessage);
      console.error(this.getMessageByKey('form-miss'));
      return;
    }

    if (!this.emailService.isValidEmail(email)) {
      this.markControlAsTouched(form, 'email');
      const statusMessage = this.setStatus(ContactFormStatus.Error, 'email-valid');
      this.showPopup(statusMessage);
      return;
    }

    if (!this.emailService.isMessageValid(message)) {
      this.markControlAsTouched(form, 'message');
      const statusMessage = this.setStatus(ContactFormStatus.Warning, 'ten-char-mess');
      this.showPopup(statusMessage);
      return;
    }

    this.emailService.sendEmail({ name, email, message })
      .then((response) => {
        if (response.ok) {
          this.emailService.recordSubmissionTime();
          const successMessage = this.setStatus(ContactFormStatus.Success, 'success');
          this.showPopup(successMessage);
          form.resetForm();
        } else {
          const failureMessage = this.setStatus(ContactFormStatus.Error, 'fail-retry');
          this.showPopup(failureMessage);
          console.error(this.getMessageByKey('form-miss'), response);
        }
      })
      .catch((error) => {
        const errorMessage = this.setStatus(ContactFormStatus.Error, 'err-sending');
        this.showPopup(errorMessage);
        console.error(this.getMessageByKey('form-miss'), error);
      });
  }

  /**
   * Shows a popup with the provided message.
   * @param message The message to display in the popup.
   */
  showPopup(message: string): void {
    if (this.customPopup && message) {
      this.customPopup.togglePopup(message);
    }
  }

  shouldShowError(form: NgForm, controlName: string): boolean {
    const control = form?.controls?.[controlName];
    return !!control && control.invalid && (control.touched || form.submitted);
  }

  getFieldColor(form: NgForm, controlName: string): 'primary' | 'accent' | 'warn' {
    return this.shouldShowError(form, controlName) ? 'warn' : 'primary';
  }

  get statusClass(): string | null {
    if (this.currentStatus === ContactFormStatus.Idle) {
      return null;
    }
    return `status-${this.currentStatus}`;
  }

  private refreshStatusMessage(): void {
    if (!this.statusKey) {
      return;
    }
    const message = this.getMessageByKey(this.statusKey);
    this.statusMessage = message || null;
    if (!message) {
      this.currentStatus = ContactFormStatus.Idle;
      this.statusKey = null;
    }
  }

  private setStatus(status: ContactFormStatus, key: string): string {
    this.currentStatus = status;
    this.statusKey = key;
    const message = this.getMessageByKey(key);
    this.statusMessage = message || null;
    if (!message) {
      this.currentStatus = ContactFormStatus.Idle;
      this.statusKey = null;
    }
    return message;
  }

  private handleFormspreeConfiguration(): void {
    if (!this.isFormspreeConfigured) {
      const message = this.setStatus(ContactFormStatus.Warning, 'formspree-disabled');
      this.popupMessage = message;
      return;
    }

    this.refreshStatusMessage();
  }

  private getMessageByKey(key: string): string {
    return this.contactMe.emailMessages.find(msg => msg.keyMess === key)?.valueMess || '';
  }

  private markAllControlsAsTouched(form: NgForm): void {
    const controls = Object.values(form.controls) as AbstractControl[];

    controls.forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }

  private markControlAsTouched(form: NgForm, controlName: string): void {
    const control = form.controls[controlName] as AbstractControl | undefined;

    control?.markAsTouched();
    control?.updateValueAndValidity();
  }
}
