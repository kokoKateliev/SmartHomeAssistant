import { CommonModule, JsonPipe } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

type LoginFormData = {
  email: string;
  password: string;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  router = inject(Router);
  authService = inject(AuthService);

  wrongEmailOrPassword = false;
  isLoading = false;

  formSubmitHandler(): void {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value as LoginFormData;
    this.isLoading = true;
    this.authService.login(email, password);
    this.authService.isLoggedIn.subscribe(isLogged => {
      if (isLogged) {
        this.isLoading = false;
        this.router.navigate(['/rooms']);
      } else {
        this.isLoading = false;
        this.wrongEmailOrPassword = true;
      }
    });
  }
}
