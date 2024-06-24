import { Component, EventEmitter, Input, Output, ViewChild, inject, viewChild } from '@angular/core';
import { Device } from '../../types/IDevice';
import { DevicesService } from '../../services/devices.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeviceNamesPipe } from "../../pipes/device-names.pipe";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-device-controller',
    standalone: true,
    templateUrl: './device-controller.component.html',
    styleUrl: './device-controller.component.css',
    imports: [ReactiveFormsModule, CommonModule, DeviceNamesPipe]
})
export class DeviceControllerComponent {
  fb = inject(FormBuilder);
  devicesService = inject(DevicesService);

  deviceSubscription!: Subscription;

  device: Device | null = null;  
  controllerForm!: FormGroup;

  switchPower() {
    if(this.device) {
      this.device.power_status = !this.device.power_status;
      this.devicesService.updateDevice(this.device);
      this.devicesService.changesDeviceSubject.next(this.device);
    }
  }

  ngOnInit(): void {
    this.controllerForm = this.fb.group({
      power_status: [false],
      color: [''],
      mode: [''],
      temperature: [15]
    });

    this.deviceSubscription = this.devicesService.selectedDeviceSubject.subscribe(data => {
      this.device = data;
      this.controllerForm.patchValue({
        power_status: data!.power_status,
        color: data!.settings?.color || '',
        mode: data!.settings?.mode || '',
        temperature: data!.settings?.temperature || null
      });

      // this.controllerForm.controls['color'].valueChanges.subscribe(value => {
      //   console.log(value);
      // })
    });   

    this.controllerForm.valueChanges.subscribe((value: any) => {
      const structure = { 
        power_status: value.power_status,
        settings: {
          color: value.color,
          mode: value.mode,
          temperature : value.temperature
        }
      };
      this.device = { ...this.device!, ...structure };
      this.devicesService.updateDevice(this.device!);
      this.devicesService.changesDeviceSubject.next(this.device);
    }); 
  }
    
  ngOnDestroy(): void {
    if (this.deviceSubscription) {
      this.deviceSubscription.unsubscribe();
    }
  }
}

// this.myForm.controls['controlName'].valueChanges.subscribe(value => {
//   console.log(value);
// });
