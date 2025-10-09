import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  ASSISTANT_FALL_DURATION_MS,
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

    expect(component.isOpen).toBeTrue();
    expect(component.animationPhase).toBe('waking');
    expect(openedSpy).toHaveBeenCalled();

    tick(ASSISTANT_WAKE_DURATION_MS + ASSISTANT_JUMP_DURATION_MS);

    component.closeAssistant();
    tick(ASSISTANT_FALL_DURATION_MS);
  }));

  it('should remain open in wondering phase until closed manually', fakeAsync(() => {
    const closedSpy = jasmine.createSpy('closed');
    component.closed.subscribe(closedSpy);

    component.openAssistant();
    expect(component.animationPhase).toBe('waking');

    tick(ASSISTANT_WAKE_DURATION_MS);
    expect(component.animationPhase).toBe('jumping');

    tick(ASSISTANT_JUMP_DURATION_MS);
    expect(component.animationPhase).toBe('wondering');
    expect(component.isOpen).toBeTrue();

    tick(10_000);
    expect(component.animationPhase).toBe('wondering');
    expect(component.isOpen).toBeTrue();
    expect(closedSpy).not.toHaveBeenCalled();

    component.closeAssistant();
    tick(ASSISTANT_FALL_DURATION_MS);

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
    tick(ASSISTANT_FALL_DURATION_MS);

    expect(component.isOpen).toBeFalse();
    expect(component.animationPhase).toBe('sleeping');
    expect(closedSpy).toHaveBeenCalled();
  }));

  it('should toggle open state when clicking the avatar twice', fakeAsync(() => {
    spyOn(component, 'openAssistant').and.callThrough();
    spyOn(component, 'closeAssistant').and.callThrough();

    component.onAvatarClick();
    tick();

    expect(component.openAssistant).toHaveBeenCalled();
    expect(component.isOpen).toBeTrue();

    component.onAvatarClick();
    tick(ASSISTANT_FALL_DURATION_MS);

    expect(component.closeAssistant).toHaveBeenCalled();
    expect(component.isOpen).toBeFalse();
  }));
});
