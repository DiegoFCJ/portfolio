// src/services/email.service.ts
import { Injectable } from '@angular/core';
import * as emailValidator from 'email-validator';

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
   * Validates the email format using a regular expression or email-validator library.
   * @param email The email to validate.
   * @returns boolean Whether the email is valid.
   */
  isValidEmail(email: string): boolean {
    // First validate the general email format
    const isValidFormat = emailValidator.validate(email);

    if (!isValidFormat) {
      return false; // Invalid format
    }

    // Check if the domain exists (additional logic can be added to check for specific domains)
    const domain = email.split('@')[1];
    const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValidDomain = domainPattern.test(domain);

    return isValidDomain;
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
  sendEmail(formData: { name: string; email: string; message: string }) {
    return fetch('https://formspree.io/f/xrbgldjz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  }
}