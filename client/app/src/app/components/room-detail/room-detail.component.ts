import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { Room } from '../../types/IRoom';
import * as d3 from 'd3';
import { Device } from '../../types/IDevice';
import { v4 } from 'uuid';
import { DeviceControllerComponent } from '../device-controller/device-controller.component';
import { DevicesService } from '../../services/devices.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [DeviceControllerComponent],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent {
  roomId!: string | null;
  room: Room | undefined;
  devices: Device[] = [];

  areLoadedDevices: boolean = false;
  areShownDevices: boolean = false;

  route = inject(ActivatedRoute);
  roomsService = inject(RoomsService);
  devicesService = inject(DevicesService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('_id');
      if (this.roomId) {
        this.roomsService.roomsBSubject.subscribe(data => {
          this.room = data.find(room => room._id === this.roomId);
          this.initializeRoom();
        });
        
        this.devicesService.getDevicesFromRoom(this.roomId);
        this.devicesService.devicesBSubject.subscribe(data => {
          if(this.roomId && data.length){
            this.devices = data;
            if(!this.areShownDevices){
              this.loadDevicesOnSvg();
            }
          }
        });
        
        this.devicesService.changesDeviceSubject.subscribe(data => {
          if(data) {
            this.updateSelectedDevice(data);
          }
        })
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['devices']) {
      // this.updateSelectedDevice();
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

  initializeRoom(): void {
    // "url('../../assets/diningroom.png')" 
    if(this.room){
      const url = "url('../../assets/" + this.room.name.replace(/\s+/g, '').toLowerCase() + ".png')";
      if (typeof document !== 'undefined') {
        this.createSvg(url);
      }
    }
  }

  selectedDevice: Device | undefined = undefined;

  editMode: boolean = false;

  toggle() {
    this.editMode = !this.editMode;
  }

  private svg: any;
  private roomWidth = '100%';
  private roomHeight = '100%';
  private selectedElement: string | null = null;

  deviceImages: { [key: string]: string } = {
    lamp : 'assets/lamp.png',
    tv : 'assets/tv.png',
    curtains : 'assets/curtains.png',
    airconditioner : 'assets/airconditioner.png',
    dishWasher : 'assets/dishwasher.png',
    coffeeMachine : 'assets/coffeemachine.png'
  }

  private createSvg(url: string): void {
    if(this.room){
      this.svg = d3.select("figure#room")
        .append("svg")
        .attr("width", this.roomWidth)
        .attr("height", this.roomHeight)
        .attr("_id", this.room._id!)
        .style("background-image", url)
        .style("background-repeat", "no-repeat")
        .style("backgroind-position", "center")
        .style("background-size", "100% 100%")
  
        .style("border-radius", "15px");
  
      this.svg.on('click', (event: MouseEvent) => this.addElement(event));
    }
    if(this.areLoadedDevices) {
      this.loadDevicesOnSvg();
    }
  }

  selectElement(element: string): void {
    this.selectedElement = element;
  }

  private addElement(event: MouseEvent): void {
    if (!this.selectedElement) return;

    const [x, y] = d3.pointer(event);

    const newDevice: Device = {
      roomId: this.room!._id!,
      settings: {},
      position: { x, y },
      name: this.selectedElement,
      power_status: false,
      time_start: new Date(),
    };

    this.devicesService.addNewDevice(newDevice);
    this.devicesService.addedDeviceSubject.subscribe(device => {
      if(device){      
        const group = this.svg.append('g')
        .attr('transform', `translate(${x},${y})`)
        .call(d3.drag()
        .on('drag', (event: any) => {
          d3.select(event.sourceEvent.target.parentNode)
            .attr('transform', `translate(${event.x},${event.y})`);
        })
        .on('end', (event: any) => {
          this.updateDevicePosition(device._id!, event.x, event.y);
        })
      );

      const circle = group.append('circle')
        .attr('r', 25)
        .attr('id', device._id)
        .attr('element', this.selectElement)
        .attr('fill', '#4a4a4a')
        .on('click', (event: MouseEvent) => {
          event.stopPropagation();
          this.switchDevice(event.target);
        })
        .on('dblclick', (event: MouseEvent) => {
          event.stopPropagation();
          this.switchOn(event.target);
        });

      const href = this.deviceImages[this.selectedElement!];

      group.append('image')
        .attr('xlink:href', href)
        .attr('width', 30)
        .attr('height', 30)
        .attr('x', -15)
        .attr('y', -15);
      
      this.selectedElement = null;
      }
    });
  }

  switchDevice(element: any): void {
    const circle = d3.select(element);
    const id = circle.attr('id');
    this.selectedDevice = this.devices.find(el => el._id === id);
    if (this.selectedDevice) {
      this.devicesService.selectDevice(this.selectedDevice);
    }
  }

  private switchOn(element: any): void {
    const circle = d3.select(element);
    const id = circle.attr('id');
    const device = this.devices.find(el => el._id === id);
    if(!device)
      return console.log("Not Found Device")
    const currentColor = circle.attr('fill');
    const el = device.name;
    let activeColor = '#188c25';
    if(el === 'lamp') {
      const device = this.devices.find(d => d._id === id);
      if(!device!.settings){
        device!.settings = {
          color: 'yellow'
        };
      }
      activeColor = device?.settings.color ? device.settings.color : '#188c25';
    }
    const newColor = currentColor === '#4a4a4a' ? activeColor : '#4a4a4a';
    circle.attr('fill', newColor);

    const parentTransform = d3.select(element.parentNode).attr('transform');
    const [x, y] = parentTransform.replace('translate(', '').replace(')', '').split(',').map(Number);

    if (device) {
      device.power_status = !device.power_status;
      this.devicesService.updateDevice(device);
    }
  }

  private updateDevicePosition(id: string, x: number, y: number): void {
    const device = this.devices.find(el => el._id === id);
    if (device) {
      device.position.x = x;
      device.position.y = y;
      this.devicesService.updateDevice(device);
    }
  }

  updateDevice(device: Device): void {
    this.devicesService.updateDevice(device);
  }

  private loadDevicesOnSvg(): void {
    if(!this.svg) {
      this.areLoadedDevices = true;
      return;
    }

    
    this.areShownDevices = true;

    if (this.devices.length) {
      // this.clearSvg();
      this.devices.forEach(data => {
        const group = this.svg.append('g')
          .attr('transform', `translate(${data.position.x},${data.position.y})`)
          .call(d3.drag()
            .on('drag', (event: any) => {
              d3.select(event.sourceEvent.target.parentNode)
                .attr('transform', `translate(${event.x},${event.y})`);
              data.position.x = event.x;
              data.position.y = event.y;
            })
            .on('end', () => {
              this.updateDevicePosition(data._id!, data.position.x!, data.position.y!);
            })
          );

        const circle = group.append('circle')
          .attr('r', 25)
          .attr('id', data._id)
          .attr('element', this.selectElement)
          .attr('fill', data.power_status ? data.settings?.color ? data.settings.color : '#188c25' : '#4a4a4a')
          .attr('element', this.selectElement)
          .on('click', (event: MouseEvent) => {
            event.stopPropagation();
            this.switchDevice(event.target);
          })
          .on('dblclick', (event: MouseEvent) => {
            event.stopPropagation();
            this.switchOn(event.target);
          });
        const href = this.deviceImages[data.name];
        group.append('image')
          .attr('xlink:href', href)
          .attr('width', 30)
          .attr('height', 30)
          .attr('x', -15)
          .attr('y', -15);
      });
    }
  }
  
  private clearSvg(): void {
    if(this.svg.selectAll('g')){
      this.svg.selectAll('g').remove();
    }
  }

  private updateSelectedDevice(device: Device): void {
    const circle = d3.select(`[id="${device._id}"]`);
    const oldDevice = this.devices.find(el => el._id === device._id);
    if(!circle || !oldDevice) {
      return;
    }
    if(oldDevice.power_status !== device.power_status) {
      const currentColor = circle.attr('fill');
      if(currentColor !== device.settings.color || oldDevice.power_status !== device.power_status ){
        let activeColor = '#188c25';
        if(device.settings?.color){
          activeColor = device.settings.color;
        }
        if(device.power_status) {
          circle.attr('fill', activeColor);
        }
        else{
          circle.attr('fill', '#4a4a4a');
        }
      }
    } 
    
    if(device.name === 'lamp' && device.settings.color !== oldDevice?.settings?.color){
      circle.attr('fill', device.settings.color ? device.settings.color : 'yellow');
    }
  }

}
