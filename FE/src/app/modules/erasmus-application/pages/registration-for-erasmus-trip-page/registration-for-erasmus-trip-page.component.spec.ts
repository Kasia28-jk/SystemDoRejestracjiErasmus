import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationForErasmusTripPageComponent } from './registration-for-erasmus-trip-page.component';

describe('RegistrationForErasmusTripPageComponent', () => {
  let component: RegistrationForErasmusTripPageComponent;
  let fixture: ComponentFixture<RegistrationForErasmusTripPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationForErasmusTripPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationForErasmusTripPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
