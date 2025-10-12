// src/services/email.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * Service responsible for handling email-related operations.
 */
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly lastSubmissionKey = 'lastSubmissionTimestamp'; // Key to store in localStorage
  private readonly cooldownPeriod = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  constructor() {}

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
  async sendEmail(formData: { name: string; email: string; message: string }) {
    const endpoint = environment.formspreeEndpoint;

    if (!endpoint) {
      this.logFallback('Formspree endpoint non configurato: messaggio non inviato.', formData);
      return new Response(null, { status: 204, statusText: 'No endpoint configured' });
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        this.logFallback(`Invio email fallito con status ${response.status}`, formData);
      }

      return response;
    } catch (error) {
      this.logFallback('Errore di rete durante l\'invio del messaggio.', { ...formData, error });
      throw error;
    }
  }

  private logFallback(message: string, payload: unknown): void {
    if (!environment.production) {
      // eslint-disable-next-line no-console
      console.info(`[EmailService] ${message}`, payload);
    }
  }
}
