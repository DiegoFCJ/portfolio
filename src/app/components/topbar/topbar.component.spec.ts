import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';
import { ThemeService } from '../../services/theme.service';
import { BehaviorSubject } from 'rxjs';
import { ThemeKey } from '../../models/theme-key.type';
import { LanguageCode } from '../../models/language-code.type';

class MockThemeService {
  private readonly themeSubject = new BehaviorSubject<ThemeKey>('dark');
  readonly currentTheme$ = this.themeSubject.asObservable();

  getAvailableThemes(): ThemeKey[] {
    return ['light', 'dark', 'blue', 'green', 'red'];
  }

  getCurrentTheme(): ThemeKey {
    return this.themeSubject.value;
  }

  setTheme(theme: ThemeKey): void {
    this.themeSubject.next(theme);
  }

  getThemeLabel(theme: ThemeKey, language: LanguageCode): string {
    return `${language}-${theme}`;
  }
}

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: ThemeService, useClass: MockThemeService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links', () => {
    const links = fixture.nativeElement.querySelectorAll('.topbar__link');
    expect(links.length).toBeGreaterThan(0);
  });
});
