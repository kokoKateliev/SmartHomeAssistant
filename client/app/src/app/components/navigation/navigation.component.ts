import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink,AsyncPipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  isDay!: boolean;

  authService=inject(AuthService)

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
