import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsComponent } from './skills.component';
import { CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { skills } from '../../data/skills.data'; // Import skills data
import { MockTranslationService } from '../../testing/mock-translation.service';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, SkillsComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize skill sections correctly', () => {
    expect(component.sections.length).toBeGreaterThan(0);
    expect(component.sections[0].skills.length).toBeGreaterThan(0);
  });

  it('should check mobile layout when window size is small', () => {
    spyOn(component, 'checkIfMobile').and.callFake(() => component.isMobile = true);
    component.onResize();
    expect(component.isMobile).toBeTrue();
  });

  it('should check desktop layout when window size is large', () => {
    spyOn(component, 'checkIfMobile').and.callFake(() => component.isMobile = false);
    component.onResize();
    expect(component.isMobile).toBeFalse();
  });

  it('should correctly move to the next section in the carousel', () => {
    component.sections = skills.skills; // Simulating skills data
    component.currentIndex = 0;
    component.moveToNext();
    expect(component.currentIndex).toBe(1); // Should move to the next section
  });

  it('should correctly move to the previous section in the carousel', () => {
    component.sections = skills.skills; // Simulating skills data
    component.currentIndex = 1;
    component.moveToPrevious();
    expect(component.currentIndex).toBe(0); // Should move to the previous section
  });

  it('should reset to the first section when moving past the last one', () => {
    component.sections = skills.skills; // Simulating skills data
    component.currentIndex = component.sections.length - 1;
    component.moveToNext();
    expect(component.currentIndex).toBe(0); // Should reset to the first section
  });

  it('should reset to the last section when moving before the first one', () => {
    component.sections = skills.skills; // Simulating skills data
    component.currentIndex = 0;
    component.moveToPrevious();
    expect(component.currentIndex).toBe(component.sections.length - 1); // Should reset to the last section
  });

  it('should toggle the "clicked" state when a skill is clicked', () => {
    const skill = component.sections[0].skills[0];
    const initialState = skill.clicked;
    component.onSkillClick(new MouseEvent('click'), skill);
    expect(skill.clicked).toBe(!initialState); // "clicked" should toggle between true/false
  });

  it('should show popup message when a skill is clicked', () => {
    const skill = component.sections[0].skills[0];
    const parentElement = document.createElement('div');
    const targetElement = document.createElement('button');
    parentElement.appendChild(targetElement);
    const event = { currentTarget: targetElement } as unknown as MouseEvent;
    const popupSpy = spyOn(component, 'createPopupMessage').and.callThrough();

    component.onSkillClick(event, skill);

    expect(popupSpy).toHaveBeenCalledWith(targetElement);
    expect(parentElement.querySelector('.popup')).toBeTruthy();
  });

  it('should guard against missing event targets when creating popup', () => {
    const skill = component.sections[0].skills[0];
    const event = { currentTarget: null, target: null } as unknown as MouseEvent;
    const popupSpy = spyOn(component, 'createPopupMessage');

    component.onSkillClick(event, skill);

    expect(popupSpy).not.toHaveBeenCalled();
  });
});
