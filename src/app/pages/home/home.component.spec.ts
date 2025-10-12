import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { ElementRef, QueryList } from '@angular/core';
import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, NoopAnimationsModule],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService }
      ]
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

  const mockSection = (top: number, height: number) => {
    let currentTop = top;
    let currentHeight = height;

    return {
      update(topUpdate: number, heightUpdate: number = currentHeight) {
        currentTop = topUpdate;
        currentHeight = heightUpdate;
      },
      nativeElement: {
        getBoundingClientRect: () => ({
          top: currentTop,
          bottom: currentTop + currentHeight,
          height: currentHeight
        })
      }
    };
  };

  const triggerViewportUpdate = (instance: HomeComponent) =>
    (instance as unknown as { updateCurrentSectionFromViewport(): void }).updateCurrentSectionFromViewport();

  const setSections = (sections: Array<ReturnType<typeof mockSection>>) => {
    component.sections = {
      toArray: () => sections
    } as unknown as QueryList<ElementRef<HTMLElement>>;
  };

  it('should identify the section containing the viewport center', () => {
    const firstSection = mockSection(0, 600);
    const secondSection = mockSection(600, 600);

    setSections([firstSection, secondSection]);

    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(1000);

    triggerViewportUpdate(component);

    expect(component.currentSectionIndex).toBe(0);

    firstSection.update(-500);
    secondSection.update(100);

    triggerViewportUpdate(component);

    expect(component.currentSectionIndex).toBe(1);
  });

  it('should select the first visible section when no section contains the viewport center', () => {
    const firstSection = mockSection(-800, 400);
    const secondSection = mockSection(-300, 400);
    const thirdSection = mockSection(200, 400);

    setSections([firstSection, secondSection, thirdSection]);

    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(600);

    triggerViewportUpdate(component);

    expect(component.currentSectionIndex).toBe(2);
  });

  it('should update totalSections based on rendered sections', () => {
    const firstSection = mockSection(0, 400);
    const secondSection = mockSection(400, 400);

    setSections([firstSection, secondSection]);

    triggerViewportUpdate(component);

    expect(component.totalSections).toBe(2);
  });
});
