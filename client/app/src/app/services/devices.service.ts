import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Device } from '../types/IDevice';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  http = inject(HttpClient);

  devicesBSubject = new BehaviorSubject<Device[]>([]);

  addedDeviceSubject = new Subject<Device | null>();

  selectedDeviceSubject = new Subject<Device | null>();
  
  changesDeviceSubject = new Subject<Device | null>();

  getDevicesFromRoom(roomId: string): void {
    if(roomId){
      this.http.get<Device[]>(`http://localhost:8080/devices/room/${roomId}`).subscribe((devices: Device[]) => {
        if(devices && devices.length !== 0){
          this.devicesBSubject.next(devices);
        }
      });
    }
  }

  getDevices(): Device[] {
    return this.devicesBSubject.value;
  }

  addNewDevice(device: Device) {
    this.saveDeviceToDatabase(device, true).subscribe((savedDevice: Device) => {
      const currentDevices = this.devicesBSubject.value;
      this.devicesBSubject.next([...currentDevices, savedDevice]);
      this.addedDeviceSubject.next(savedDevice);
    });
  }

  updateDevice(updatedDevice: Device): void {
    this.saveDeviceToDatabase(updatedDevice).subscribe((savedDevice: Device) => {
      const currentDevices = this.devicesBSubject.value.map(device =>
        device._id === savedDevice._id ? savedDevice : device
      );
      this.devicesBSubject.next(currentDevices);
    });
  }

  private saveDeviceToDatabase(device: Device, isNew: boolean = false): Observable<Device> {
    if (isNew) {
      return this.http.post<Device>('http://localhost:8080/devices', device);
    } else {
      return this.http.put<Device>(`http://localhost:8080/devices/${device._id}`, device);
    }
  }

  selectDevice(device: Device): void {
    this.selectedDeviceSubject.next(device);
  }
}
