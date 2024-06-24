import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
// import { AuthService } from './auth/auth.service';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterModule, AsyncPipe,NgIf,HttpClientModule,RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[HttpClientModule]
})
export class AppComponent{
  title="app";
  isLoggedIn = false;

  authService=inject(AuthService);

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);
  }

  logout() {
    this.authService.logout();
  }
}


