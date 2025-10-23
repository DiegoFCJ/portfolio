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

  it('should apply the page variant by default', () => {
    const hostElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.classList.contains('skills--page')).toBeTrue();
  });

  it('should apply the home variant when requested', () => {
    component.variant = 'home';
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.classList.contains('skills--home')).toBeTrue();
    expect(hostElement.classList.contains('skills--page')).toBeFalse();
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
    component.sections = skills.it?.skills ?? skills.en?.skills ?? [];
    component.isMobile = false;
    component.currentIndex = 0;
    component.moveToNext();
    expect(component.currentIndex).toBe(1); // Should move to the next section
  });

  it('should correctly move to the previous section in the carousel', () => {
    component.sections = skills.it?.skills ?? skills.en?.skills ?? [];
    component.isMobile = false;
    component.currentIndex = 1;
    component.moveToPrevious();
    expect(component.currentIndex).toBe(0); // Should move to the previous section
  });

  it('should reset to the first section when moving past the last one', () => {
    component.sections = skills.it?.skills ?? skills.en?.skills ?? [];
    component.isMobile = false;
    component.currentIndex = component.sections.length - 1;
    component.moveToNext();
    expect(component.currentIndex).toBe(0); // Should reset to the first section
  });

  it('should reset to the last section when moving before the first one', () => {
    component.sections = skills.it?.skills ?? skills.en?.skills ?? [];
    component.isMobile = false;
    component.currentIndex = 0;
    component.moveToPrevious();
    expect(component.currentIndex).toBe(component.sections.length - 1); // Should reset to the last section
  });

  it('should cycle spotlight panels when in mobile layout', () => {
    const panels = component.activePanels;
    expect(panels.length).toBeGreaterThan(0);

    component.isMobile = true;
    component.currentIndex = 0;

    component.moveToNext();
    expect(component.currentIndex).toBe(panels.length > 1 ? 1 : 0);

    component.moveToPrevious();
    expect(component.currentIndex).toBe(0);

    component.currentIndex = 0;
    component.moveToPrevious();
    expect(component.currentIndex).toBe(panels.length - 1);
  });

});
