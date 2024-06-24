import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from 'express';
import { matchingFieldValue } from '../../../validators/fns/matching-field-value';
import { AuthGuard } from '../auth.guard';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService,HttpClientModule],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = new FormGroup({
    username: new FormControl<string>("", [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
    passwordRepeat: new FormControl<string>('', [
      matchingFieldValue('password'),
    ]),
  });

  onSubmit() {
    if (this.registerForm.invalid) return;
    const {username, email, password } = this.registerForm.value;

    // if (this.registerForm.valid) {
    //   const { username, email, password } = this.registerForm.value;
    //   //@ts-ignore
    //   this.authService.register(username, email, password).subscribe(
    //     (response: any) => {
    //       console.log('Registration successful', response);
    //     },
    //     (error: any) => {
    //       console.error('Registration failed', error);
    //     }
    //   );
    // }
  }
}
