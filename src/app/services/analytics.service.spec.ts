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

  it('should initialise dataLayer immediately and send default consent before updates', () => {
    const analyticsService = getService();
    const doc = getDocument();
    const win = doc.defaultView as Window & { dataLayer?: unknown[]; gtag?: jasmine.Spy } | null;

    expect(Array.isArray(win?.dataLayer)).toBeTrue();

    analyticsService.updateConsent(false);

    expect(win?.dataLayer).toBeTruthy();
    expect(typeof win?.gtag).toBe('function');

    const dataLayerEntries = (win?.dataLayer as IArguments[]) ?? [];
    expect(dataLayerEntries.length).toBe(2);
    expect(Array.from(dataLayerEntries[0])).toEqual([
      'consent',
      'default',
      { analytics_storage: 'denied', ad_storage: 'denied' },
    ]);
    expect(Array.from(dataLayerEntries[1])).toEqual([
      'consent',
      'update',
      { analytics_storage: 'denied', ad_storage: 'denied' },
    ]);
  });

  it('should send consent updates without repeating the default denied value', () => {
    const analyticsService = getService();
    const doc = getDocument();
    const win = doc.defaultView as Window & { dataLayer?: unknown[] } | null;

    analyticsService.updateConsent(false);
    analyticsService.updateConsent(true);

    const dataLayerEntries = (win?.dataLayer as IArguments[]) ?? [];
    expect(dataLayerEntries.length).toBe(3);
    expect(Array.from(dataLayerEntries[2])).toEqual([
      'consent',
      'update',
      { analytics_storage: 'granted', ad_storage: 'denied' },
    ]);
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
