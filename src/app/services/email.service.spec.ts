import { TestBed } from '@angular/core/testing';
import { EmailService } from './email.service';
import { APP_ENVIRONMENT } from '../tokens/environment.token';
import { EnvironmentConfig } from '../../environments/environment';

describe('EmailService', () => {
  let service: EmailService;

  const environmentStub: EnvironmentConfig = {
    production: false,
    gaTrackingId: 'G-1234567890',
    formspreeEndpoint: 'https://formspree.io/f/xrbgldjz',
    enableAnalytics: true,
    enableErrorTracking: true,
    sentryDsn: 'https://example@sentry.test/1',
    sentryTracesSampleRate: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: APP_ENVIRONMENT, useValue: environmentStub }],
    });
    service = TestBed.inject(EmailService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isValidEmail', () => {
    it('should return true for a valid email', () => {
      expect(service.isValidEmail('test@example.com')).toBeTrue();
    });

    it('should return false for an invalid email format', () => {
      expect(service.isValidEmail('invalid-email')).toBeFalse();
    });

    it('should return false for an email missing a valid top-level domain', () => {
      expect(service.isValidEmail('test@invalid_domain')).toBeFalse();
    });
  });

  describe('isMessageValid', () => {
    it('should return true for a message with length >= 10', () => {
      expect(service.isMessageValid('Valid message')).toBeTrue();
    });

    it('should return false for a message shorter than 10 characters', () => {
      expect(service.isMessageValid('Short')).toBeFalse();
    });
  });

  describe('canSubmitMessage', () => {
    it('should return true if no submission has been made', () => {
      expect(service.canSubmitMessage()).toBeTrue();
    });

    it('should return true if the cooldown period has passed', () => {
      const pastTime = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(); // 3 hours ago
      localStorage.setItem('lastSubmissionTimestamp', pastTime);
      expect(service.canSubmitMessage()).toBeTrue();
    });

    it('should return false if the cooldown period has not passed', () => {
      const recentTime = new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(); // 1 hour ago
      localStorage.setItem('lastSubmissionTimestamp', recentTime);
      expect(service.canSubmitMessage()).toBeFalse();
    });
  });

  describe('recordSubmissionTime', () => {
    it('should record the current time in localStorage', () => {
      const before = new Date();
      service.recordSubmissionTime();
      const recordedTime = new Date(localStorage.getItem('lastSubmissionTimestamp') || '');
      expect(recordedTime.getTime()).toBeGreaterThanOrEqual(before.getTime());
    });
  });

  describe('sendEmail', () => {
    const mockFormData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'Hello, this is a test email!',
    };

    beforeEach(() => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(null, { status: 200 }))
      );
    });

    it('should send an email with the correct payload', async () => {
      await service.sendEmail(mockFormData);
      expect(window.fetch).toHaveBeenCalledWith('https://formspree.io/f/xrbgldjz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(mockFormData),
      });
    });

    it('should handle a successful email submission', async () => {
      const response = await service.sendEmail(mockFormData);
      expect(response.ok).toBeTrue();
    });

    it('should handle a failed email submission', async () => {
      (window.fetch as jasmine.Spy).and.returnValue(
        Promise.resolve(new Response(null, { status: 400 }))
      );
      const response = await service.sendEmail(mockFormData);
      expect(response.ok).toBeFalse();
    });
  });
});