import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent {
  @Input() room!: string | null;
  devices = [/* данни за устройствата */];
  selectedDevice = null;

  addDevice(device: string) {
    // Логика за добавяне на устройство в D3 визуализацията
  }
}
