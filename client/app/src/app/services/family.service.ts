import { Injectable, inject } from '@angular/core';
import { AuthService } from '../components/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../types/IUser';
import { Family } from '../types/IFamily';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  userService = inject(AuthService);
  http = inject(HttpClient);

  user!: User;
  subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.userService.userBSubject.subscribe(user => {
      if(user) {
        this.user = user;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  
  getFamily(){
    return this.http.get<Family>(`http://localhost:8080/families/${this.user.family_id}`);
  }
  
}
