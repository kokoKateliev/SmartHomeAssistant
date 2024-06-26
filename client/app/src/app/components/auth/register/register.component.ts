import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  wrongEmailOrPassword = false;

  registerForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    uniqueCode: new FormControl<string>(''),
  });

  formSubmitHandler(): void {
    if (this.registerForm.invalid) return;
    let { email, password, firstName, lastName, uniqueCode } =
      this.registerForm.value;
    if (!uniqueCode) uniqueCode = undefined;
    try{
    const err=this.authService.register(
      this.registerForm.value.email!,
      this.registerForm.value.password!,
      this.registerForm.value.firstName!,
      this.registerForm.value.lastName!,
      this.registerForm.value.uniqueCode!
    );
    this.wrongEmailOrPassword = false;
  }
  catch{
    this.wrongEmailOrPassword = true;

  }
    this.router.navigate(['/login']);
  }
}
