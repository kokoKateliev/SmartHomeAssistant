import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamilyService } from '../../services/family.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-join-family',
  standalone: true,
  imports: [FormGroup,CommonModule],
  templateUrl: './join-family.component.html',
  styleUrl: './join-family.component.css'
})

export class JoinFamilyComponent {
  joinFamilyForm: FormGroup;
  createFamilyForm: FormGroup;
  userId: string;


  constructor(
    private fb: FormBuilder,
    private familyService: FamilyService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = this.authService.getUserId();  //should get session user id

    this.joinFamilyForm = this.fb.group({
      familyId: ['', Validators.required],
    });

    this.createFamilyForm = this.fb.group({
      familyName: ['', Validators.required],
    });
  }

  joinFamily() {
    if (this.joinFamilyForm.valid) {
      const familyId = this.joinFamilyForm.value.familyId;
      this.familyService.joinFamily(familyId, this.userId).subscribe(
        (response) => {
          console.log('Joined family:', response);
          this.router.navigate(['rooms']); 
        },
        (error) => {
          console.error('Error joining family:', error);
        }
      );
    }
  }

  createFamily() {
    if (this.createFamilyForm.valid) {
      const family:IFamily = { name: this.createFamilyForm.value.familyName, members: [this.userId] };
      this.familyService.createFamily(family).subscribe(
        (response) => {
          console.log('Created family:', response);
          this.router.navigate(['home']); // Redirect to home or another page
        },
        (error) => {
          console.error('Error creating family:', error);
        }
      );
    }
  }
}
