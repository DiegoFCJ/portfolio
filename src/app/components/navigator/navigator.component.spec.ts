import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavigatorComponent } from './navigator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeswitchComponent } from './themeswitch/themeswitch.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';
import { provideRouter } from '@angular/router';

/**
 * Unit tests for NavigatorComponent to ensure correct functionality.
 */
describe('NavigatorComponent', () => {
  let component: NavigatorComponent;
  let fixture: ComponentFixture<NavigatorComponent>;

  /**
   * Sets up the testing environment for NavigatorComponent.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigatorComponent, MatIconModule, MatTooltipModule, ThemeswitchComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        provideRouter([]),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavigatorComponent);
    component = fixture.componentInstance;
    component.isOpen = true;
    fixture.detectChanges();
  });

  /**
   * Verifies that the component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifies that the next navigation event is emitted when onNext is called.
   */
  it('should emit navigateNext event when onNext is called', () => {
    spyOn(component.navigateNext, 'emit');
    component.onNext();
    expect(component.navigateNext.emit).toHaveBeenCalled();
  });

  /**
   * Verifies that the previous navigation event is emitted when onPrevious is called.
   */
  it('should emit navigatePrevious event when onPrevious is called', () => {
    spyOn(component.navigatePrevious, 'emit');
    component.currentSectionIndex = 1;
    component.onPrevious();
    expect(component.navigatePrevious.emit).toHaveBeenCalled();
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

  it('should close navigator and reset menus when close button is clicked', () => {
    component.isOpen = true;
    component.showLanguageOptions = true;
    component.showThemeOptions = true;
    component.showPageOptions = true;
    fixture.detectChanges();

    const closeButton: HTMLButtonElement = fixture.nativeElement.querySelector('.close-button');
    expect(closeButton).withContext('Close button should be rendered when navigator is open').toBeTruthy();

    closeButton.click();
    fixture.detectChanges();

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

  /**
   * Verifies that the navigation buttons are displayed conditionally.
   */
  it('should display navigation buttons based on current section index', () => {
    component.totalSections = 5;
    component.currentSectionIndex = 0;
    fixture.detectChanges();

    const prevButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      `button[aria-label="${component.getTooltip('prev')}"]`
    );
    const nextButtonInitial: HTMLButtonElement = fixture.nativeElement.querySelector(
      `button[aria-label="${component.getTooltip('next')}"]`
    );

    expect(prevButton.disabled).toBeTrue();
    expect(nextButtonInitial.disabled).toBeFalse();

    component.currentSectionIndex = 4;
    fixture.detectChanges();

    const nextButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      `button[aria-label="${component.getTooltip('next')}"]`
    );
    expect(nextButton.disabled).toBeTrue();

    component.currentSectionIndex = 2;
    fixture.detectChanges();

    expect(prevButton.disabled).toBeFalse();
    expect(nextButton.disabled).toBeFalse();
  });

  it('should provide fallback tooltip text for unsupported languages', () => {
    component.currentLang = 'fr';

    const tooltip = component.getTooltip('prev');

    expect(tooltip).toBe(component['tooltipTexts']['it'].prev);
  });

  it('should close page options when navigating to a route', fakeAsync(() => {
    component.showPageOptions = true;
    fixture.detectChanges();

    component.navigateToPage(component.pageLinks[0]);

    tick();
    expect(component.showPageOptions).toBeFalse();
  }));
});
