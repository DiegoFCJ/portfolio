import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMaskComponent } from './landing-mask.component';

describe('LandingMaskComponent', () => {
  let component: LandingMaskComponent;
  let fixture: ComponentFixture<LandingMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingMaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
