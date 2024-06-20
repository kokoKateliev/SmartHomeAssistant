import { Component, Input, inject } from '@angular/core';
import { Device } from '../../types/IDevice';
import { DevicesService } from '../../services/devices.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-controller',
  standalone: true,
  imports: [],
  templateUrl: './device-controller.component.html',
  styleUrl: './device-controller.component.css'
})
export class DeviceControllerComponent {
  @Input() device!: Device | null;

  deviceService = inject(DevicesService);
  subscription!: Subscription;
  // color!:string;
  // temperature!: number;
  // mode!: string;

  ngOnInit() {
    this.subscription = this.deviceService.selectedDevice$.subscribe(device => {
      this.device = device;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  SwitchPower(): void {
    if(this.device){
      this.device.power_status = !this.device.power_status;
    }
  }
}
