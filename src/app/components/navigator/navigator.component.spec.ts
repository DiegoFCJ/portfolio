import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigatorComponent } from './navigator.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';

/**
 * Unit tests for NavigatorComponent to ensure correct functionality.
 */
describe('NavigatorComponent', () => {
  let component: NavigatorComponent;
  let fixture: ComponentFixture<NavigatorComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigatorComponent, RouterTestingModule],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigatorComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.isOpen = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit navigateNext event when onNext is called and navigation is allowed', () => {
    component.totalSections = 3;
    component.currentSectionIndex = 1;
    spyOn(component.navigateNext, 'emit');

    component.onNext();

    expect(component.navigateNext.emit).toHaveBeenCalled();
  });

  it('should not emit navigateNext when navigation is disabled', () => {
    component.totalSections = 0;
    component.currentSectionIndex = 0;
    spyOn(component.navigateNext, 'emit');

    component.onNext();

    expect(component.navigateNext.emit).not.toHaveBeenCalled();
  });

  it('should emit navigatePrevious event when onPrevious is called and navigation is allowed', () => {
    component.totalSections = 4;
    component.currentSectionIndex = 2;
    spyOn(component.navigatePrevious, 'emit');

    component.onPrevious();

    expect(component.navigatePrevious.emit).toHaveBeenCalled();
  });

  it('should disable navigation buttons when there are no sections', () => {
    component.totalSections = 0;
    component.currentSectionIndex = 0;
    fixture.detectChanges();

    const previousButton = fixture.nativeElement.querySelector(`button[aria-label="${component.getTooltip('prev')}"]`) as HTMLButtonElement;
    const nextButton = fixture.nativeElement.querySelector(`button[aria-label="${component.getTooltip('next')}"]`) as HTMLButtonElement;

    expect(previousButton.disabled).toBeTrue();
    expect(nextButton.disabled).toBeTrue();
  });

  it('should close navigator and reset menus when toggle button is clicked', () => {
    component.isOpen = true;
    component.showLanguageOptions = true;
    component.showThemeOptions = true;
    component.showPageOptions = true;
    fixture.detectChanges();

    const toggleButton: HTMLButtonElement = fixture.nativeElement.querySelector('.close-button');
    expect(toggleButton).withContext('Integrated close/toggle button should be present when navigator is open').toBeTruthy();

    toggleButton.click();
    fixture.detectChanges();

    expect(component.isOpen).toBeFalse();
    expect(component.showLanguageOptions).toBeFalse();
    expect(component.showThemeOptions).toBeFalse();
    expect(component.showPageOptions).toBeFalse();
  });

  it('should open page menu and navigate to a selected route', () => {
    spyOn(router, 'navigateByUrl').and.resolveTo(true);

    component.togglePageOptions();
    fixture.detectChanges();

    const pageOptions = fixture.nativeElement.querySelector('.page-options');
    expect(pageOptions).toBeTruthy();

    component.onSelectPage(component.pageLinks[0]);
    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith(component.pageLinks[0].route);
    expect(component.showPageOptions).toBeFalse();
  });

  it('should close navigator and reset menus on manual wheel interactions outside the component', () => {
    component.isOpen = true;
    component.showLanguageOptions = true;
    component.showThemeOptions = true;
    component.showPageOptions = true;

    component.onWindowWheel({ target: null } as unknown as WheelEvent);

    expect(component.isOpen).toBeFalse();
    expect(component.showLanguageOptions).toBeFalse();
    expect(component.showThemeOptions).toBeFalse();
    expect(component.showPageOptions).toBeFalse();
  });

  it('should keep the navigator open for wheel events that originate within the component', () => {
    component.isOpen = true;
    component.showLanguageOptions = true;
    component.showThemeOptions = true;
    component.showPageOptions = true;

    const hostElement = fixture.nativeElement as HTMLElement;
    component.onWindowWheel({ target: hostElement } as unknown as WheelEvent);

    expect(component.isOpen).toBeTrue();
    expect(component.showLanguageOptions).toBeTrue();
    expect(component.showThemeOptions).toBeTrue();
    expect(component.showPageOptions).toBeTrue();
  });

  it('should keep the navigator open during programmatic scrolls triggered by navigation buttons', fakeAsync(() => {
    component.isOpen = true;
    component.showLanguageOptions = true;
    component.showThemeOptions = true;
    component.showPageOptions = true;
    component.totalSections = 5;

    component.onNext();

    component.onWindowWheel({ target: null } as unknown as WheelEvent);

    expect(component.isOpen).toBeTrue();
    expect(component.showLanguageOptions).toBeTrue();
    expect(component.showThemeOptions).toBeTrue();
    expect(component.showPageOptions).toBeTrue();

    tick(800);

    component.onWindowWheel({ target: null } as unknown as WheelEvent);

    expect(component.isOpen).toBeFalse();
    expect(component.showLanguageOptions).toBeFalse();
    expect(component.showThemeOptions).toBeFalse();
    expect(component.showPageOptions).toBeFalse();
  }));

  it('should provide fallback tooltip text for unsupported languages', () => {
    (component as unknown as { currentLang: string }).currentLang = 'fr';

    const tooltip = component.getTooltip('prev');

    expect(tooltip).toBe('Sezione precedente');
  });
});
