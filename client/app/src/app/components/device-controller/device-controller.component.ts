import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Device } from '../../types/IDevice';
import { DevicesService } from '../../services/devices.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-device-controller',
  standalone: true,
  imports: [FormsModule, NgSwitch],
  templateUrl: './device-controller.component.html',
  styleUrl: './device-controller.component.css'
})
export class DeviceControllerComponent {
  @Input() device: Device | undefined;

  constructor(private devicesService: DevicesService) {}

  switchPower(): void {
    if (this.device) {
      this.device.power_status = !this.device.power_status;
      this.devicesService.updateDevice(this.device);
    }
  }

  updateDeviceSetting(settingName: string, value: any): void {
    if (this.device) {
      if (!this.device.settings) {
        this.device.settings = {};
      }
      // this.device.settings[settingName] = value;
      this.devicesService.updateDevice(this.device);
    }
  }
}
