import { Component, inject } from '@angular/core';
import { RoomDetailComponent } from '../room-detail/room-detail.component';
import { CommonModule } from '@angular/common';
import { Room } from '../../types/IRoom';
import { v4 } from 'uuid';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { RoomsService } from '../../services/rooms.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-room-manager',
  standalone: true,
  imports: [RoomDetailComponent, CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './room-manager.component.html',
  styleUrl: './room-manager.component.css'
})
export class RoomManagerComponent {
  roomsService = inject(RoomsService);
  http = inject(HttpClient);
  subscription!: Subscription;

  isAddingRoom: boolean = false;
  roomForm = new FormGroup({
    roomName: new FormControl<string>(''),
    temperature: new FormControl<number>(30),
  });

  rooms : Room[] = [];
  
  ngOnInit(): void {
    this.roomsService.loadRooms();
    this.subscription = this.roomsService.roomsBSubject.subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  showAddRoomForm() {
    this.isAddingRoom = !this.isAddingRoom;
  }
  
  addRoom() {
    const { roomName, temperature } = this.roomForm.value;
    const newRoom: Room = {
      userId: localStorage.getItem("user_session")!,
      name: roomName!,
      temperature: temperature!
    }
    this.roomsService.addRoom(newRoom);
  }

  cancel() {
    this.roomForm.reset();
    this.isAddingRoom = false;
  }
}
