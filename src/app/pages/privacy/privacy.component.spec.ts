import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyComponent } from './privacy.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';
import { ViewportService } from '../../services/viewport.service';
import { MockViewportService } from '../../testing/mock-viewport.service';

describe('PrivacyComponent', () => {
  let component: PrivacyComponent;
  let fixture: ComponentFixture<PrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: ViewportService, useClass: MockViewportService }
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
