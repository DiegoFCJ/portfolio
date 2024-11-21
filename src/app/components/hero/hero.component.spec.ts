import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { SocialComponent } from '../social/social.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent, CustomPopupComponent, SocialComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the popup when togglePopup is called', () => {
    component.togglePopup();
    expect(component.isPopupVisible).toBeTrue();
  });

  it('should hide the popup after 3 seconds when togglePopup is called', (done: DoneFn) => {
    component.togglePopup();
    setTimeout(() => {
      expect(component.isPopupVisible).toBeFalse();
      done();
    }, 3000);
  });
});
