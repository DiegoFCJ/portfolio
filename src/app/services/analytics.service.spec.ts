import { TestBed } from '@angular/core/testing';
import { AnalyticsService } from './analytics.service';
import { APP_ENVIRONMENT } from '../tokens/environment.token';
import { EnvironmentConfig } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

describe('AnalyticsService', () => {
  const baseEnvironment: EnvironmentConfig = {
    production: false,
    gaTrackingId: 'G-TEST123',
    formspreeEndpoint: '',
    enableAnalytics: true,
    enableErrorTracking: false,
    sentryDsn: '',
    sentryTracesSampleRate: 0,
  };

  let service: AnalyticsService;
  let documentRef: Document;

  const cleanupScripts = () => {
    const head = documentRef.head;
    head.querySelectorAll('script').forEach(script => {
      if (script.src.includes('googletagmanager.com/gtag/js?id=')) {
        head.removeChild(script);
      }
    });
    const win = documentRef.defaultView as Window & { gtag?: unknown; dataLayer?: unknown } | null;
    if (win) {
      delete win.gtag;
      delete win.dataLayer;
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        { provide: APP_ENVIRONMENT, useValue: { ...baseEnvironment } },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    documentRef = TestBed.inject(DOCUMENT);
    service = TestBed.inject(AnalyticsService);
  });

  afterEach(() => {
    cleanupScripts();
    TestBed.resetTestingModule();
  });

  it('should not inject the analytics script when consent is missing', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue(null);

    service.initialize();

    const script = documentRef.head.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-TEST123"]');
    expect(script).toBeNull();
  });

  it('should inject the analytics script when consent is granted', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue('granted');

    service.initialize();

    const script = documentRef.head.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-TEST123"]');
    expect(script).not.toBeNull();
  });

  it('should send page views after initialization', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue('granted');
    service.initialize();

    const win = documentRef.defaultView as Window & { gtag?: jasmine.Spy };
    win.gtag = jasmine.createSpy('gtag');

    service.trackPageView('/home');

    expect(win.gtag).toHaveBeenCalledWith('config', 'G-TEST123', { page_path: '/home' });
  });

  it('should skip initialization when analytics are disabled', () => {
    TestBed.overrideProvider(APP_ENVIRONMENT, { useValue: { ...baseEnvironment, enableAnalytics: false } });
    service = TestBed.inject(AnalyticsService);
    spyOn(window.localStorage, 'getItem').and.returnValue('granted');

    service.initialize();

    const script = documentRef.head.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-TEST123"]');
    expect(script).toBeNull();
  });
});
