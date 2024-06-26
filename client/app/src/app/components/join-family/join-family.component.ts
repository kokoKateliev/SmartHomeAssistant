import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FamilyService } from '../../services/family.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Family } from '../../types/IFamily';
@Component({
  selector: 'app-join-family',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './join-family.component.html',
  styleUrl: './join-family.component.css'
})

export class JoinFamilyComponent {
 
  userId!: string;

  fb=inject(FormBuilder)
   familyService=inject(FamilyService)
   authService=inject(AuthService)
   router=inject(Router)

  //   this.userId = this.authService.getUserId();  //should get session user id

    joinFamilyForm = new FormGroup({
      familyId: new FormControl<string>('', [Validators.required, Validators.email]),
    });

    createFamilyForm = new FormGroup({
      familyName: new FormControl<string>('', [Validators.required, Validators.email]),

    });

  joinFamily() {
    // if (this.joinFamilyForm.valid) {
    //   const familyId = this.joinFamilyForm.value.familyId;
    //   this.familyService.joinFamily(familyId, this.userId).subscribe(
    //     (response) => {
    //       console.log('Joined family:', response);
    //       this.router.navigate(['rooms']); 
    //     },
    //     (error) => {
    //       console.error('Error joining family:', error);
    //     }
    //   );
    // }
  }

  createFamily() {
    // if (this.createFamilyForm.valid) {
    //   const family = { name: this.createFamilyForm.value.familyName, members: [this.userId] };

    //   this.familyService.createFamily(family>).subscribe(
    //     (response) => {
    //       console.log('Created family:', response);
    //       this.router.navigate(['home']); // Redirect to home or another page
    //     },
    //     (error) => {
    //       console.error('Error creating family:', error);
    //     }
    //   );
    // }
  }
}
