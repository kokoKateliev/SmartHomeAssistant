import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceControllerComponent } from './device-controller.component';

describe('DeviceControllerComponent', () => {
  let component: DeviceControllerComponent;
  let fixture: ComponentFixture<DeviceControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
