import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ElementRef } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, NoopAnimationsModule]
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

  it('should move to the next section on scroll down', () => {
    component.sections = {
      toArray: () => [{ nativeElement: document.createElement('div') }] as ElementRef[]
    } as any; // Mock della sezione per il test
    component.currentSectionIndex = 0;

    component.onWheelScroll({ deltaY: 1, preventDefault: () => {} } as WheelEvent); // Simula scroll down
    expect(component.currentSectionIndex).toBe(1);
  });

  it('should not move beyond the last section on scroll down', () => {
    component.sections = {
      toArray: () => [
        { nativeElement: document.createElement('div') },
        { nativeElement: document.createElement('div') }
      ] as ElementRef[]
    } as any;
    component.currentSectionIndex = 1;

    component.onWheelScroll({ deltaY: 1, preventDefault: () => {} } as WheelEvent); // Simula scroll down
    expect(component.currentSectionIndex).toBe(1); // Dovrebbe restare sull'ultima sezione
  });

  it('should move to the previous section on scroll up', () => {
    component.sections = {
      toArray: () => [
        { nativeElement: document.createElement('div') },
        { nativeElement: document.createElement('div') }
      ] as ElementRef[]
    } as any;
    component.currentSectionIndex = 1;

    component.onWheelScroll({ deltaY: -1, preventDefault: () => {} } as WheelEvent); // Simula scroll up
    expect(component.currentSectionIndex).toBe(0);
  });

  it('should not move beyond the first section on scroll up', () => {
    component.sections = {
      toArray: () => [{ nativeElement: document.createElement('div') }] as ElementRef[]
    } as any;
    component.currentSectionIndex = 0;

    component.onWheelScroll({ deltaY: -1, preventDefault: () => {} } as WheelEvent); // Simula scroll up
    expect(component.currentSectionIndex).toBe(0); // Dovrebbe restare sulla prima sezione
  });

  it('should set isScrolling to true during scroll and block further scrolls', () => {
    component.sections = {
      toArray: () => [{ nativeElement: document.createElement('div') }] as ElementRef[]
    } as any;
    component.currentSectionIndex = 0;
    component.isScrolling = false;

    component.onWheelScroll({ deltaY: 1, preventDefault: () => {} } as WheelEvent); // Simula scroll down
    expect(component.isScrolling).toBeTrue();

    component.onWheelScroll({ deltaY: 1, preventDefault: () => {} } as WheelEvent); // Scroll bloccato
    expect(component.currentSectionIndex).toBe(1); // Indice resta invariato mentre isScrolling è true
  });
});
