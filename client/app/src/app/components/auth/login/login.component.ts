import { CommonModule } from '@angular/common';
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

  formSubmitHandler() {
    this.isLoading = true;

    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value as LoginFormData;
    this.authService.login(email, password);
    this.authService.isLoggedIn.subscribe(isLogged => {
      if (isLogged) {
        this.router.navigate(['/rooms']);
        this.isLoading = false;
      } else {
        this.wrongEmailOrPassword = true;
        this.isLoading = false;
      }
    });
    
  }
}
