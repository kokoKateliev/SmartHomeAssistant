import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  // private apiUrl = '/api/devices';

  constructor(private http: HttpClient) { }

  // getDevices() {
  //   return this.http.get<[]>(this.apiUrl);
  // }

  // addDevice(device: any) {
  //   return this.http.post(this.apiUrl, device);
  // }

  // updateDevice(device: any) {
  //   return this.http.put(`${this.apiUrl}/${device.id}`, device);
  // }

  // deleteDevice(id: string) {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }
}
