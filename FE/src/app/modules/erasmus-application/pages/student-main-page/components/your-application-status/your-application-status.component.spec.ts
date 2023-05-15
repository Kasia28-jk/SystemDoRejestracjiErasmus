import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourApplicationStatusComponent } from './your-application-status.component';

describe('YourApplicationStatusComponent', () => {
  let component: YourApplicationStatusComponent;
  let fixture: ComponentFixture<YourApplicationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourApplicationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
