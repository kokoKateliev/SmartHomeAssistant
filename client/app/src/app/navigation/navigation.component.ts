import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  isDay!: boolean;

  ngOnInit(): void {

    //can be changed to detect async the time
    const time = new Date().getHours();
    if(time >= 7 && time <= 19){
      this.isDay = true;
    }
    else{
      this.isDay = false;
    }
  }
}
