import { Component } from '@angular/core';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { CommonModule } from '@angular/common';
import { Room } from '../types/IRoom';

@Component({
  selector: 'app-room-manager',
  standalone: true,
  imports: [RoomDetailComponent, CommonModule],
  templateUrl: './room-manager.component.html',
  styleUrl: './room-manager.component.css'
})
export class RoomManagerComponent {
  //Services
  // roomService = inject(RoomsService);
  
  //Datas
  rooms : Room[] = [
    {
      room_id: 1,
      name: "Kitchen",
      temperature: 35.8,
      devices: [
        {
          name: "Coffee Machine",
          device_id: 1,
          power_status: false,
          position: {
              x: 1,
              y: 1,
          },
          settings: { },
        },
        {
          name: "Air Conditioner",
          device_id: 2,
          power_status: true,
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
      room_id: 1,
      name: "Living Room",
      temperature: 35.8,
      devices: [
        {
          name: "TV",
          device_id: 3,
          power_status: true,
          position: {
              x: 5,
              y: 5,
          },
          settings: { },
        },
        {
          name: "Air Conditioner",
          device_id: 2,
          power_status: false,
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
    // rooms = RoomsService.getRooms();  
    
  }

  selectedRoom: Room | null = null;

  selectRoom(room: Room) {
    this.selectedRoom = room;
  }
}
