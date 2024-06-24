import { Component, ViewChild, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from 'express';
import { AuthGuard } from '../auth.guard';
import { HttpClientModule } from '@angular/common/http';

type LoginFormData = {
  email: string;
  password: string;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf,ReactiveFormsModule],
  providers: [AuthService,HttpClientModule],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  wrongEmailOrPassword = false;
  isLoading = false;

  onSubmit() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value as LoginFormData;
    this.isLoading = true;
    // if (this.loginForm.valid) {
    //   const { email, password } = this.loginForm.value as LoginFormData;
    //   this.authService.login(email, password).subscribe(
    //     (response: any) => {
    //       console.log('Login successful', response);
    //       this.isLoading = false;
    //     },
    //     (error: any) => {
    //       console.error('Login failed', error);
    //       this.isLoading = false;
    //       this.wrongEmailOrPassword = true;
    //     }
    //   );
    // }
  }
}
