import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerfiComponent } from './otp-verfi.component';

describe('OtpVerfiComponent', () => {
  let component: OtpVerfiComponent;
  let fixture: ComponentFixture<OtpVerfiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpVerfiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpVerfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
