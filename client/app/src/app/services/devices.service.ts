import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Device } from '../types/IDevice';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  http = inject(HttpClient);

  private devicesSubject = new BehaviorSubject<Device[]>([]);
  devices$ = this.devicesSubject.asObservable();

  private selectedDeviceSubject = new Subject<Device | null>();
  selectedDevice$ = this.selectedDeviceSubject.asObservable();

  getDevicesFromRoom(roomId: string): void {
    if(roomId){
      this.http.get<Device[]>(`/api/room/${roomId}/devices`).subscribe((devices: Device[]) => {
        this.devicesSubject.next(devices);
      });
    }
  }

  getDevices(): Device[] {
    return this.devicesSubject.value;
  }

  addDeviceToDevices(device: Device): void {
    this.saveDeviceToDatabase(device).subscribe((savedDevice: Device) => {
      const currentDevices = this.devicesSubject.value;
      this.devicesSubject.next([...currentDevices, savedDevice]);
    });
  }

  updateDevice(updatedDevice: Device): void {
    this.saveDeviceToDatabase(updatedDevice).subscribe((savedDevice: Device) => {
      const currentDevices = this.devicesSubject.value.map(device =>
        device.device_id === savedDevice.device_id ? savedDevice : device
      );
      this.devicesSubject.next(currentDevices);
    });
  }

  private saveDeviceToDatabase(device: Device) {
    if (device.device_id) {
      return this.http.put<Device>(`/api/device/${device.device_id}`, device);
    } else {
      return this.http.post<Device>('/api/device', device);
    }
  }

  selectDevice(device: Device): void {
    this.selectedDeviceSubject.next(device);
  }
}
