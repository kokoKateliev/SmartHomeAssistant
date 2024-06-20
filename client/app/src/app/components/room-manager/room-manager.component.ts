import { Component, inject } from '@angular/core';
import { RoomDetailComponent } from '../room-detail/room-detail.component';
import { CommonModule } from '@angular/common';
import { Room } from '../../types/IRoom';
import { v4 } from 'uuid';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-room-manager',
  standalone: true,
  imports: [RoomDetailComponent, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './room-manager.component.html',
  styleUrl: './room-manager.component.css'
})
export class RoomManagerComponent {
  roomsService = inject(RoomsService);
  http = inject(HttpClient);
  subscription!: Subscription;

  rooms : Room[] = [
    {
      room_id: v4(),
      name: "Kitchen",
      temperature: 35.8,
      devices: [
        {
          name: "lamp",
          device_id: 'e54a27f9-d25c-48cd-b102-7c47ed4d87ce',
          power_status: false,
          time_start: new Date(),
          position: {
              x: 321.6979064941406,
              y: 236.57290649414062,
          },
          settings: { },
        },
        {
          name: "Air Conditioner",
          device_id:  '367c8f5d-1e11-4ec7-9ef7-e8426da303a3',
          power_status: true,
          time_start: new Date(),
          position: {
              x: 10,
              y: 10,
          },
          settings: {
            temperature: 25,
            mode: "cold"
          },
        }
      ]
    },
    {
      room_id: v4(),
      name: "Living Room",
      temperature: 35.8,
      devices: [
        {
          name: "TV",
          device_id:  '4c0527a7-55e3-4878-be73-9667db404cf9',
          power_status: true,
          time_start: new Date(),
          position: {
              x: 5,
              y: 5,
          },
          settings: { },
        },
        {
          name: "Air Conditioner",
          device_id: '4b28205f-960b-4de7-b918-8a060f4fdd33',
          power_status: false,
          time_start: new Date(),
          position: {
              x: 10,
              y: 10,
          },
          settings: {
            temperature: 30,
            mode: "hot"
          },
        }
      ]
    }
  ];
  
  ngOnInit(): void {
    this.subscription = this.roomsService.rooms$.subscribe(rooms => {
      this.rooms = rooms;
    });
    this.roomsService.loadRooms();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
