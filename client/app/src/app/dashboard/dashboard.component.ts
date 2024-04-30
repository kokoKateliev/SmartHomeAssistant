import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { ITodos, ITodo } from '../types/todos';
import { CommonModule } from '@angular/common';
import { IDevice } from '../types/device';
import { Room } from '../types/rooms';
import { ClockComponent } from '../clock/clock.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NavigationComponent, ClockComponent, CommonModule]
})
export class DashboardComponent {
    todoList: ITodos[] = [
        {
            member: "Mom",
            todos: [
                {
                    time: new Date(),
                    todo: "test 1",
                },
                {
                    time: new Date(),
                    todo: "test 2",
                },
                {
                    time: new Date(),
                    todo: "test 3",
                },
                {
                    time: new Date(),
                    todo: "test 4",
                },
                {
                    time: new Date(),
                    todo: "test 5",
                },

             ]
        }
    ];
    
    
    //inject rooms
    roomList: Room[] = [ "Living Room", "Kitchen", "Bed Room", "Dining Room"]
    room: Room | null = this.roomList.length > 0 ? this.roomList[0] : null; // default to be the first room or null

    //inject workingDevices
    workingList: IDevice[] = [
        {
            name: "Washing Machine",
            room: "Kitchen",
            mode: true,
        },
        {
            name: "Lamps",
            room: "Dining Room",
            mode: false,
        },
        {
            name: "TV",
            room: "Dining Room",
            mode: true,
        },{
            name: "Air Conditioner",
            room: "Bed Room",
            mode: true,
        }
    ]
    workingMachines!: IDevice[];

    changeRoomHandler(room: Room){
        this.room = room;
        this.workingMachines = this.workingList.filter(device => device.mode === true && device.room === room);
    }
    

}
