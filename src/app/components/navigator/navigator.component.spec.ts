import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavigatorComponent } from './navigator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeswitchComponent } from './themeswitch/themeswitch.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';

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
        { provide: TranslationService, useClass: MockTranslationService }
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
    fixture.detectChanges();

    const toggleButton: HTMLButtonElement = fixture.nativeElement.querySelector('.close-button');
    expect(toggleButton).withContext('Integrated close/toggle button should be present when navigator is open').toBeTruthy();

    toggleButton.click();
    fixture.detectChanges();

    expect(component.isOpen).toBeFalse();
    expect(component.showLanguageOptions).toBeFalse();
    expect(component.showThemeOptions).toBeFalse();
  });

  it('should close navigator and reset menus on manual wheel interactions outside the component', () => {
    component.isOpen = true;
    component.showLanguageOptions = true;
    component.showThemeOptions = true;

    component.onWindowWheel({ target: null } as unknown as WheelEvent);

    expect(component.isOpen).toBeFalse();
    expect(component.showLanguageOptions).toBeFalse();
    expect(component.showThemeOptions).toBeFalse();
  });

  it('should close navigator and reset menus when close button is clicked', () => {
    component.isOpen = true;
    component.showLanguageOptions = true;
    component.showThemeOptions = true;
    fixture.detectChanges();

    const closeButton: HTMLButtonElement = fixture.nativeElement.querySelector('.close-button');
    expect(closeButton).withContext('Close button should be rendered when navigator is open').toBeTruthy();

    closeButton.click();
    fixture.detectChanges();

    expect(component.isOpen).toBeFalse();
    expect(component.showLanguageOptions).toBeFalse();
    expect(component.showThemeOptions).toBeFalse();
  });

  it('should keep the navigator open for wheel events that originate within the component', () => {
    component.isOpen = true;
    component.showLanguageOptions = true;
    component.showThemeOptions = true;

    const hostElement = fixture.nativeElement as HTMLElement;
    component.onWindowWheel({ target: hostElement } as unknown as WheelEvent);

    expect(component.isOpen).toBeTrue();
    expect(component.showLanguageOptions).toBeTrue();
    expect(component.showThemeOptions).toBeTrue();
  });

  it('should keep the navigator open during programmatic scrolls triggered by navigation buttons', fakeAsync(() => {
    component.isOpen = true;
    component.showLanguageOptions = true;
    component.showThemeOptions = true;

    component.onNext();

    component.onWindowWheel({ target: null } as unknown as WheelEvent);

    expect(component.isOpen).toBeTrue();
    expect(component.showLanguageOptions).toBeTrue();
    expect(component.showThemeOptions).toBeTrue();

    tick(800);

    component.onWindowWheel({ target: null } as unknown as WheelEvent);

    expect(component.isOpen).toBeFalse();
    expect(component.showLanguageOptions).toBeFalse();
    expect(component.showThemeOptions).toBeFalse();
  }));

  /**
   * Verifies that the navigation buttons are displayed conditionally.
   */
  it('should display navigation buttons based on current section index', () => {
    component.currentSectionIndex = 0;
    fixture.detectChanges();
    let prevButton = fixture.nativeElement.querySelector('button[aria-label="Sezione precedente"]');
    expect(prevButton).toBeNull();  // Previous button should be hidden

    component.currentSectionIndex = 7;
    fixture.detectChanges();
    let nextButton = fixture.nativeElement.querySelector('button[aria-label="Sezione successiva"]');
    expect(nextButton).toBeNull();  // Next button should be hidden

    component.currentSectionIndex = 4;
    fixture.detectChanges();
    prevButton = fixture.nativeElement.querySelector('button[aria-label="Sezione precedente"]');
    nextButton = fixture.nativeElement.querySelector('button[aria-label="Sezione successiva"]');
    expect(prevButton).toBeTruthy();  // Previous button should be visible
    expect(nextButton).toBeTruthy();  // Next button should be visible
  });
});
