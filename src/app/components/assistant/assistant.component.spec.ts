import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  ASSISTANT_IMPATIENCE_DURATION_MS,
  ASSISTANT_JUMP_DURATION_MS,
  ASSISTANT_WAKE_DURATION_MS,
  AssistantComponent
} from './assistant.component';
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
    expect(component.animationPhase).toBe('sleeping');
  });

  it('should emit opened event and start waking phase when opened', fakeAsync(() => {
    const openedSpy = jasmine.createSpy('opened');
    component.opened.subscribe(openedSpy);

    component.openAssistant();
    tick();

    expect(component.isOpen).toBeTrue();
    expect(component.animationPhase).toBe('waking');
    expect(openedSpy).toHaveBeenCalled();

    component.closeAssistant();
    tick();
  }));

  it('should transition through jump and impatience before returning to sleep', fakeAsync(() => {
    const closedSpy = jasmine.createSpy('closed');
    component.closed.subscribe(closedSpy);

    component.openAssistant();
    expect(component.animationPhase).toBe('waking');

    tick(ASSISTANT_WAKE_DURATION_MS - 1);
    expect(component.animationPhase).toBe('waking');

    tick(1);
    expect(component.animationPhase).toBe('jumping');

    tick(ASSISTANT_JUMP_DURATION_MS);
    expect(component.animationPhase).toBe('impatient');
    expect(component.isOpen).toBeTrue();

    tick(ASSISTANT_IMPATIENCE_DURATION_MS - 1);
    expect(component.animationPhase).toBe('impatient');

    tick(1);
    expect(component.animationPhase).toBe('sleeping');
    expect(component.isOpen).toBeFalse();
    expect(closedSpy).toHaveBeenCalledTimes(1);
  }));

  it('should emit closed event and reset state when closed manually', fakeAsync(() => {
    const closedSpy = jasmine.createSpy('closed');
    component.closed.subscribe(closedSpy);

    component.openAssistant();
    tick(ASSISTANT_WAKE_DURATION_MS + 50);
    component.closeAssistant();
    tick();

    expect(component.isOpen).toBeFalse();
    expect(component.animationPhase).toBe('sleeping');
    expect(closedSpy).toHaveBeenCalled();
  }));
});
