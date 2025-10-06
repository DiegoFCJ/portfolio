import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AssistantComponent } from './assistant.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';

describe('AssistantComponent', () => {
  let component: AssistantComponent;
  let fixture: ComponentFixture<AssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistantComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isOpen).toBeFalse();
    expect(component.animationPhase).toBe('idle');
  });

  it('should emit opened event and start wondering phase when opened', fakeAsync(() => {
    const openedSpy = jasmine.createSpy('opened');
    component.opened.subscribe(openedSpy);

    component.openAssistant();
    tick();

    expect(component.isOpen).toBeTrue();
    expect(component.animationPhase).toBe('wondering');
    expect(openedSpy).toHaveBeenCalled();

    component.closeAssistant();
    tick();
  }));

  it('should transition from wondering to suggestClose after five seconds', fakeAsync(() => {
    component.openAssistant();
    expect(component.animationPhase).toBe('wondering');

    tick(4999);
    expect(component.animationPhase).toBe('wondering');

    tick(1);
    expect(component.animationPhase).toBe('suggestClose');
  }));

  it('should emit closed event and reset state when closed', fakeAsync(() => {
    const closedSpy = jasmine.createSpy('closed');
    component.closed.subscribe(closedSpy);

    component.openAssistant();
    tick(5000);
    expect(component.animationPhase).toBe('suggestClose');

    component.closeAssistant();
    tick();

    expect(component.isOpen).toBeFalse();
    expect(component.animationPhase).toBe('idle');
    expect(closedSpy).toHaveBeenCalled();
  }));
});
