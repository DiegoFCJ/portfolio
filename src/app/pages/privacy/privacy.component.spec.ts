import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PrivacyComponent } from './privacy.component';
import { of } from 'rxjs';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { NavigationService } from '../../services/navigation.service';
import { ThemeKey } from '../../models/theme-key.type';
import { NavigationItem } from '../../models/navigation-item.interface';
import { MockTranslationService } from '../../testing/mock-translation.service';

class MockThemeService {
  readonly currentTheme$ = of<ThemeKey>('dark');

  getAvailableThemes(): ReadonlyArray<ThemeKey> {
    return ['light', 'dark'];
  }

  getCurrentTheme(): ThemeKey {
    return 'dark';
  }

  setTheme(): void {}
}

class MockNavigationService {
  getNavigationItems(): NavigationItem[] {
    return [];
  }
}

describe('PrivacyComponent', () => {
  let component: PrivacyComponent;
  let fixture: ComponentFixture<PrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyComponent, RouterTestingModule],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: ThemeService, useClass: MockThemeService },
        { provide: NavigationService, useClass: MockNavigationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
