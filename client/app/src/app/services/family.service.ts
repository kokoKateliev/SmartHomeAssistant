import { Injectable, inject } from '@angular/core';
import { AuthService } from '../components/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../types/IUser';
import { Family } from '../types/IFamily';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private apiUrl = 'http://localhost:8080/families'; // Replace with your API URL

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
    return this.http.get<Family>(`${this.apiUrl}/${this.user.family_id}`);
  }

  joinFamily(familyId: string, userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${familyId}/join`, { userId });
  }

  createFamily(family: Family): Observable<Family> {
    return this.http.post<Family>(`${this.apiUrl}`, family);
  }

  getUserFamily(userId: string): Observable<Family> {
    return this.http.get<Family>(`${this.apiUrl}/users/${userId}`);
  }
  
}
