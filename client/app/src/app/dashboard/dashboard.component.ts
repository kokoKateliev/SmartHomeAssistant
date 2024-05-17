import { Component, inject } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { ITodos, ITodo, Todos } from '../types/todos';
import { IDevice } from '../types/device';
import { Room } from '../types/rooms';
import { ClockComponent } from '../clock/clock.component';
import { WeatherComponent } from '../weather/weather.component';
import { TodoService } from '../services/todos/todo.service';
import { DeviceService } from '../services/devices/device.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NavigationComponent, ClockComponent, CommonModule, WeatherComponent]
})
export class DashboardComponent {
    todosService = inject(TodoService);
    deviceService = inject(DeviceService);
    //to be changed
    
    todoList: ITodos[] = this.todosService.getListOfAllTodos();
    

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

    // devices: any[] = [];

    changeRoomHandler(room: Room){
        this.room = room;
        this.workingMachines = this.workingList.filter(device => device.mode === true && device.room === room);
    }
    
    // ngOnInit(): void {
    //     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //     //Add 'implements OnInit' to the class.
    //     this.getDevices();
    // }

    // getDevices() {
    //     this.deviceService.getDevices().subscribe(devices => {
    //       this.devices = devices;
    //     });
    // }

    // addDevice() {
    //     const device = { name: 'New Device', room: 'Living Room' };
    //     this.deviceService.addDevice(device).subscribe(() => {
    //       this.getDevices();
    //     });
    //   }
    
    // deleteDevice(id: string) {
    //     this.deviceService.deleteDevice(id).subscribe(() => {
    //     this.getDevices();
    //     });
    //   }
}
