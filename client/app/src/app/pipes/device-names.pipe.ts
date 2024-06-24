 import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceNames',
  standalone: true
})
export class DeviceNamesPipe implements PipeTransform {

  private deviceNames: { [key: string]: string } = {
    'lamp': 'Lamp',
    'tv' : 'TV',
    'airconditioner' : 'Air Conditioner',
    'curtains' : 'Curtains',
    'dishWasher' : 'Dish Washer',
    'coffeeMachine' : 'Coffee Machine'
  }

  transform(value: string): string {
    return this.deviceNames[value];
  }

}
