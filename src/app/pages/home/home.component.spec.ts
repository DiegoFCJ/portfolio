import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ElementRef } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start at the first section', () => {
    expect(component.currentSectionIndex).toBe(0);
  });

  it('should move to the next section when navigateNext is called', () => {
    const scrollSpy = jasmine.createSpy('scrollIntoView');
    const sections = [
      { nativeElement: { scrollIntoView: jasmine.createSpy('scrollIntoView') } },
      { nativeElement: { scrollIntoView: scrollSpy } }
    ] as unknown as ElementRef[];

    component.sections = { toArray: () => sections } as any;
    component.viewInitialized = true;
    component.totalSections = sections.length;
    component.currentSectionIndex = 0;

    component.navigateNext();

    expect(component.currentSectionIndex).toBe(1);
    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('should not move beyond the last section when navigateNext is called', () => {
    const scrollSpy = jasmine.createSpy('scrollIntoView');
    const sections = [
      { nativeElement: { scrollIntoView: jasmine.createSpy('scrollIntoView') } },
      { nativeElement: { scrollIntoView: scrollSpy } }
    ] as unknown as ElementRef[];

    component.sections = { toArray: () => sections } as any;
    component.viewInitialized = true;
    component.totalSections = sections.length;
    component.currentSectionIndex = sections.length - 1;

    component.navigateNext();

    expect(component.currentSectionIndex).toBe(sections.length - 1);
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it('should move to the previous section when navigatePrevious is called', () => {
    const firstScrollSpy = jasmine.createSpy('scrollIntoView');
    const sections = [
      { nativeElement: { scrollIntoView: firstScrollSpy } },
      { nativeElement: { scrollIntoView: jasmine.createSpy('scrollIntoView') } }
    ] as unknown as ElementRef[];

    component.sections = { toArray: () => sections } as any;
    component.viewInitialized = true;
    component.totalSections = sections.length;
    component.currentSectionIndex = 1;

    component.navigatePrevious();

    expect(component.currentSectionIndex).toBe(0);
    expect(firstScrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('should not move before the first section when navigatePrevious is called', () => {
    const sections = [
      { nativeElement: { scrollIntoView: jasmine.createSpy('scrollIntoView') } },
      { nativeElement: { scrollIntoView: jasmine.createSpy('scrollIntoView') } }
    ] as unknown as ElementRef[];

    component.sections = { toArray: () => sections } as any;
    component.viewInitialized = true;
    component.totalSections = sections.length;
    component.currentSectionIndex = 0;

    component.navigatePrevious();

    expect(component.currentSectionIndex).toBe(0);
  });

  it('should scroll to the specified section', () => {
    const firstScrollSpy = jasmine.createSpy('scrollIntoView');
    const secondScrollSpy = jasmine.createSpy('scrollIntoView');
    const sections = [
      { nativeElement: { scrollIntoView: firstScrollSpy } },
      { nativeElement: { scrollIntoView: secondScrollSpy } }
    ] as unknown as ElementRef[];

    component.sections = { toArray: () => sections } as any;

    component.scrollToSection(1);

    expect(firstScrollSpy).not.toHaveBeenCalled();
    expect(secondScrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('should handle keyboard navigation', () => {
    const nextSpy = spyOn(component, 'navigateNext');
    const prevSpy = spyOn(component, 'navigatePrevious');

    component.handleKeyboardEvent({ key: 'ArrowDown' } as KeyboardEvent);
    component.handleKeyboardEvent({ key: 'ArrowUp' } as KeyboardEvent);

    expect(nextSpy).toHaveBeenCalled();
    expect(prevSpy).toHaveBeenCalled();
  });
});
