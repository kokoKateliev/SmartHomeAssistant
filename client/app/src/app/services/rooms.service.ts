import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../types/IRoom';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  http = inject(HttpClient);

  roomsBSubject = new BehaviorSubject<Room[]>([]);

  loadRooms(): void {
      this.http.get<Room[]>('http://localhost:8080/rooms/').subscribe((rooms: Room[]) => {
        this.roomsBSubject.next(rooms);
      });
  }

  getCurrentRooms(): Room[] {
    return this.roomsBSubject.value;
  }

  getRoomDetail(roomId: string): Room | undefined {
    if(!this.roomsBSubject.value.length){
      this.loadRooms();
    }
    return this.roomsBSubject.value.find(room => room._id === roomId);
  }

  addRoom(room: Room): void {
    this.saveRoomToDatabase(room).subscribe((savedRoom: Room) => {
      const currentRooms = this.roomsBSubject.value;
      this.roomsBSubject.next([...currentRooms, savedRoom]);
    });
  }

  // updateRoom(updatedRoom: Room): void {
  //   this.saveRoomToDatabase(updatedRoom).subscribe((savedRoom: Room) => {
  //     const currentRooms = this.roomsSubject.value.map(room =>
  //       room.room_id === savedRoom.room_id ? savedRoom : room
  //     );
  //     this.roomsSubject.next(currentRooms);
  //   });
  // }

  private saveRoomToDatabase(room: Room) {
    return this.http.post<Room>('http://localhost:8080/rooms/', room);
  }

}
