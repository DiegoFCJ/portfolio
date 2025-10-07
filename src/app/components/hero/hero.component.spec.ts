import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { SocialComponent } from '../social/social.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent, CustomPopupComponent, SocialComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when navigateToNextSection is called', () => {
    spyOn(component.navigateNextSection, 'emit');
    component.navigateToNextSection();
    expect(component.navigateNextSection.emit).toHaveBeenCalled();
  });
  
  it('should emit navigateNextSection when navigateToNextSection is called', () => {
    spyOn(component.navigateNextSection, 'emit');
    component.navigateToNextSection();
    expect(component.navigateNextSection.emit).toHaveBeenCalled();
  });

  it('should start the typing animation', () => {
    component.displayText = '';
    component.startTypingAnimation();
    expect(component.displayText).not.toBe('');
  });
});
