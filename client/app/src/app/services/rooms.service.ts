import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../types/IRoom';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  http = inject(HttpClient);

  private roomsSubject = new BehaviorSubject<Room[]>([]);
  rooms$ = this.roomsSubject.asObservable();

  loadRooms(): void {
      this.http.get<Room[]>('/api/rooms').subscribe((rooms: Room[]) => {
        this.roomsSubject.next(rooms);
      });
  }

  getCurrentRooms(): Room[] {
    return this.roomsSubject.value;
  }

  getRoomDetail(roomId: string): Room | undefined {
    return this.roomsSubject.value.find(room => room.room_id === roomId);
  }

  // addRoom(room: Room): void {
  //   this.saveRoomToDatabase(room).subscribe((savedRoom: Room) => {
  //     const currentRooms = this.roomsSubject.value;
  //     this.roomsSubject.next([...currentRooms, savedRoom]);
  //   });
  // }

  // updateRoom(updatedRoom: Room): void {
  //   this.saveRoomToDatabase(updatedRoom).subscribe((savedRoom: Room) => {
  //     const currentRooms = this.roomsSubject.value.map(room =>
  //       room.room_id === savedRoom.room_id ? savedRoom : room
  //     );
  //     this.roomsSubject.next(currentRooms);
  //   });
  // }

  // private saveRoomToDatabase(room: Room) {
  //   if (room.room_id) {
  //     return this.http.put<Room>(`/api/room/${room.room_id}`, room);
  //   } else {
  //     return this.http.post<Room>('/api/room', room);
  //   }
  // }

}
