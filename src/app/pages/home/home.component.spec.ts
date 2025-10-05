import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ElementRef } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const createMockSections = (count: number): ElementRef[] => {
    return Array.from({ length: count }, () => {
      const element = document.createElement('div');
      (element as any).scrollIntoView = jasmine.createSpy('scrollIntoView');
      return { nativeElement: element } as ElementRef;
    });
  };

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

  it('should update totalSections after view init', fakeAsync(() => {
    const sections = createMockSections(3);
    component.sections = { toArray: () => sections } as any;

    component.ngAfterViewInit();
    tick();

    expect(component.totalSections).toBe(3);
  }));

  it('should move to the next section when navigateNext is called', () => {
    const sections = createMockSections(2);
    component.sections = { toArray: () => sections } as any;
    component.totalSections = sections.length;
    component.viewInitialized = true;

    component.navigateNext();

    expect(component.currentSectionIndex).toBe(1);
    expect((sections[1].nativeElement as any).scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('should not move beyond the last section', () => {
    const sections = createMockSections(2);
    component.sections = { toArray: () => sections } as any;
    component.totalSections = sections.length;
    component.viewInitialized = true;

    component.currentSectionIndex = 1;
    component.navigateNext();

    expect(component.currentSectionIndex).toBe(1);
  });

  it('should move to the previous section when navigatePrevious is called', () => {
    const sections = createMockSections(2);
    component.sections = { toArray: () => sections } as any;
    component.totalSections = sections.length;
    component.viewInitialized = true;
    component.currentSectionIndex = 1;

    component.navigatePrevious();

    expect(component.currentSectionIndex).toBe(0);
    expect((sections[0].nativeElement as any).scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('should not move before the first section', () => {
    const sections = createMockSections(1);
    component.sections = { toArray: () => sections } as any;
    component.totalSections = sections.length;
    component.viewInitialized = true;

    component.navigatePrevious();

    expect(component.currentSectionIndex).toBe(0);
  });

  it('should handle keyboard navigation', () => {
    const sections = createMockSections(2);
    component.sections = { toArray: () => sections } as any;
    component.totalSections = sections.length;
    component.viewInitialized = true;

    component.handleKeyboardEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(component.currentSectionIndex).toBe(1);

    component.handleKeyboardEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(component.currentSectionIndex).toBe(0);
  });
});
