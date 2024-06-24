import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, AsyncPipe, LoginComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  isDay!: boolean;

  authService = inject(AuthService);
  router = inject(Router);

  isLogged$ = this.authService.isLoggedIn$;


  ngOnInit(): void {
    //can be changed to detect async the time
    const time = new Date().getHours();
    if (time >= 7 && time <= 19) {
      this.isDay = true;
    } else {
      this.isDay = false;
    }
  }
}
