// src/services/email.service.ts
import { Inject, Injectable } from '@angular/core';
import { APP_ENVIRONMENT } from '../tokens/environment.token';
import { EnvironmentConfig } from '../../environments/environment';

/**
 * Service responsible for handling email-related operations.
 */
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly lastSubmissionKey = 'lastSubmissionTimestamp'; // Key to store in localStorage
  private readonly cooldownPeriod = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  private readonly endpoint: string;

  constructor(@Inject(APP_ENVIRONMENT) private readonly environment: EnvironmentConfig) {
    this.endpoint = environment.formspreeEndpoint;
  }

  /**
   * Angular-aligned email validation regex (mirrors Validators.email behaviour).
   * See https://angular.io/api/forms/Validators#email for reference.
   */
  private readonly emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  /**
   * Validates the email format using a regular expression compatible with Angular's Validators.email.
   * @param email The email to validate.
   * @returns boolean Whether the email is valid.
   */
  isValidEmail(email: string): boolean {
    return this.emailPattern.test(email);
  }

  /**
   * Validates the message length to ensure it meets the minimum requirement.
   * @param message The message to validate.
   * @returns boolean Whether the message length is valid.
   */
  isMessageValid(message: string): boolean {
    return message.length >= 10;
  }

  /**
   * Checks if the user can submit a message (based on the cooldown period).
   * @returns boolean Whether the user can submit a new message.
   */
  canSubmitMessage(): boolean {
    const lastSubmission = localStorage.getItem(this.lastSubmissionKey);
    if (lastSubmission) {
      const lastSubmissionTime = new Date(lastSubmission).getTime();
      const currentTime = new Date().getTime();
      // If the time difference is less than the cooldown period, return false
      return currentTime - lastSubmissionTime >= this.cooldownPeriod;
    }
    return true; // If no submission has been made, allow submission
  }

  /**
   * Records the time of the successful message submission.
   */
  recordSubmissionTime(): void {
    localStorage.setItem(this.lastSubmissionKey, new Date().toISOString());
  }

  /**
   * Sends the email using the Formspree API.
   * @param formData The form data to send.
   * @returns A promise with the result of the email sending operation.
   */
  sendEmail(formData: { name: string; email: string; message: string }): Promise<Response> {
    if (!this.endpoint) {
      console.info('[EmailService] Formspree endpoint not configured. Payload:', formData);
      return Promise.resolve(new Response(JSON.stringify({ simulated: true }), {
        status: 200,
        statusText: 'Simulated submission',
        headers: { 'Content-Type': 'application/json' },
      }));
    }

    return fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }
}