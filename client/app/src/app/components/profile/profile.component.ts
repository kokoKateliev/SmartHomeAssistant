import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from 'express';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../types/IUser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  authService = inject(AuthService);
  router = inject(Router);

  userForm = new FormGroup({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      firstName: new FormControl<string>('', [Validators.required]),
      lastName: new FormControl<string>('', [Validators.required]),
      uniqueCode: new FormControl<string>(''),
    });
  user?: User;

  ngOnInit(): void {
    this.authService.userBSubject.subscribe(user => {
      if(user) {
        this.user = user;
        this.userForm.patchValue(
          {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            uniqueCode: user.family_id
            }
        );
      }
    });
  }

  formSubmitHandler(): void {
    if (this.userForm.invalid) return;
    let { email, firstName, lastName, uniqueCode } = this.userForm.value;
    if(!uniqueCode)
      uniqueCode = undefined;

    if(email !== this.user?.email) {
      this.user!.email = email!;
    }

    if(firstName !== this.user?.firstName) {
      this.user!.firstName = firstName!;
    }

    if(lastName !== this.user?.lastName) {
      this.user!.lastName = lastName!;
    }

    this.authService.updateUser(this.user!);
    
  }
}
