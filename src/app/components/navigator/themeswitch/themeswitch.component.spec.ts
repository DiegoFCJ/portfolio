import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeswitchComponent } from './themeswitch.component';

/**
 * Unit tests for ThemeswitchComponent.
 */
describe('ThemeswitchComponent', () => {
  let component: ThemeswitchComponent;
  let fixture: ComponentFixture<ThemeswitchComponent>;

  /**
   * Configures the testing module and initializes the component.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeswitchComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifies that the component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Tests that the theme is initialized correctly from localStorage.
   */
  it('should initialize theme correctly from localStorage', () => {
    localStorage.setItem('darkMode', 'false');
    component.ngOnInit();
    expect(component.darkMode).toBeFalse();

    localStorage.setItem('darkMode', 'true');
    component.ngOnInit();
    expect(component.darkMode).toBeTrue();
  });

  /**
   * Verifies the toggleTheme function works correctly.
   */
  it('should toggle theme and update localStorage', () => {
    localStorage.setItem('darkMode', 'false');
    component.ngOnInit();

    spyOn(localStorage, 'setItem');

    component.toggleTheme();
    expect(component.darkMode).toBeTrue();
    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'true');

    component.toggleTheme();
    expect(component.darkMode).toBeFalse();
    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'false');
  });

  /**
   * Verifies that the dark-mode class is applied correctly to the body element.
   */
  it('should apply the dark-mode class to the body element', () => {
    const bodyClassList = document.body.classList;

    component.darkMode = true;
    component.updateThemeClass();
    expect(bodyClassList.contains('dark-mode')).toBeTrue();

    component.darkMode = false;
    component.updateThemeClass();
    expect(bodyClassList.contains('dark-mode')).toBeFalse();
  });
});
