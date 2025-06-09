import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomPopupComponent } from './custom-popup.component';

describe('CustomPopupComponent', () => {
  let component: CustomPopupComponent;
  let fixture: ComponentFixture<CustomPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomPopupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct message', () => {
    component.message = 'Test Popup Message';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Test Popup Message');
  });

  it('should have the popup visible when isPopupVisible is true', () => {
    component.isPopupVisible = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.popup')?.classList).not.toContain('popup-hidden');
  });

  it('should have the popup hidden when isPopupVisible is false', () => {
    component.isPopupVisible = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.popup')?.classList).toContain('popup-hidden');
  });
});
