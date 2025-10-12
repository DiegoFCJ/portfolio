import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { environment } from '../../environments/environment';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let document: Document;
  const originalAnalytics = { ...environment.analytics };

  beforeEach(() => {
    Object.assign(environment.analytics, {
      enabled: true,
      gaTrackingId: 'TEST-ID',
      requireConsent: true,
      cookieConsentKey: 'test-consent',
    });

    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    service = TestBed.inject(AnalyticsService);
    document = TestBed.inject(DOCUMENT);

    localStorage.removeItem(environment.analytics.cookieConsentKey);
    removeScript();
  });

  afterEach(() => {
    Object.assign(environment.analytics, originalAnalytics);
    localStorage.removeItem(environment.analytics.cookieConsentKey);
    removeScript();
    delete (window as any).dataLayer;
    delete (window as any).gtag;
  });

  it('does not inject the script when consent is missing', () => {
    service.init();

    expect(document.getElementById('portfolio-google-analytics')).toBeNull();
  });

  it('injects the Google Analytics script when consent is granted', () => {
    localStorage.setItem(environment.analytics.cookieConsentKey, 'granted');

    service.init();

    expect(document.getElementById('portfolio-google-analytics')).not.toBeNull();
  });

  it('tracks a page view when gtag is available', () => {
    localStorage.setItem(environment.analytics.cookieConsentKey, 'true');
    (window as any).dataLayer = [];
    const gtagSpy = jasmine.createSpy('gtag');
    (window as any).gtag = gtagSpy;

    service.init();
    service.trackPageView('/dashboard');

    expect(gtagSpy).toHaveBeenCalledWith('config', environment.analytics.gaTrackingId, {
      page_path: '/dashboard',
    });
  });

  function removeScript(): void {
    const existing = document.getElementById('portfolio-google-analytics');
    existing?.parentNode?.removeChild(existing);
  }
});
