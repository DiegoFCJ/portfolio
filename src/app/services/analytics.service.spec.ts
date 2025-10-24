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
  };

  let service: AnalyticsService | undefined;
  let documentRef: Document | undefined;

  const cleanupScripts = (doc?: Document) => {
    if (!doc) {
      return;
    }
    const head = doc.head;
    head.querySelectorAll('script').forEach(script => {
      if (script.src.includes('googletagmanager.com/gtag/js?id=')) {
        head.removeChild(script);
      }
    });
    const win = doc.defaultView as Window & { gtag?: unknown; dataLayer?: unknown } | null;
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
  });

  afterEach(() => {
    cleanupScripts(documentRef);
    service = undefined;
    documentRef = undefined;
    TestBed.resetTestingModule();
  });

  const getDocument = (): Document => {
    if (!documentRef) {
      documentRef = TestBed.inject(DOCUMENT);
    }
    return documentRef;
  };

  const getService = (): AnalyticsService => {
    if (!service) {
      service = TestBed.inject(AnalyticsService);
    }
    return service;
  };

  it('should not inject the analytics script when consent is missing', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue(null);

    const analyticsService = getService();
    analyticsService.initialize();

    const script = getDocument().head.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-TEST123"]');
    expect(script).toBeNull();
  });

  it('should inject the analytics script when consent is granted', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue('granted');

    const analyticsService = getService();
    analyticsService.initialize();

    const script = getDocument().head.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-TEST123"]');
    expect(script).not.toBeNull();
  });

  it('should send page views after initialization', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue('granted');
    const analyticsService = getService();
    analyticsService.initialize();

    const win = getDocument().defaultView as Window & { gtag?: jasmine.Spy };
    win.gtag = jasmine.createSpy('gtag');

    analyticsService.trackPageView('/home');

    expect(win.gtag).toHaveBeenCalledWith('config', 'G-TEST123', { page_path: '/home' });
  });

  it('should skip initialization when analytics are disabled', () => {
    TestBed.overrideProvider(APP_ENVIRONMENT, { useValue: { ...baseEnvironment, enableAnalytics: false } });
    const analyticsService = getService();
    spyOn(window.localStorage, 'getItem').and.returnValue('granted');

    analyticsService.initialize();

    const script = getDocument().head.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-TEST123"]');
    expect(script).toBeNull();
  });
});
