import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, map, of } from 'rxjs';
import { User } from '../../types/IUser';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

interface IUser {
  email: string;
  password: string;
}

interface IRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  uniqueCode?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  http = inject(HttpClient);
  router=inject(Router)

  userBSubject = new BehaviorSubject<User | null>(null);
  isLoggedIn = new Subject<boolean>();

  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.userBSubject.subscribe(isUser => {
      if(isUser){
        this.isLoggedIn.next(true);
      }
      else{
        this.isLoggedIn.next(false);
      }
    });
  }

  autenticate(){
    this.userSubscription = this.userBSubject.subscribe(isUser => {
      if(isUser){
        this.isLoggedIn.next(true);
      }
      else{
        this.isLoggedIn.next(false);
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  login(email: string, password: string) {
    const user: IUser = {
      email: email,
      password: password,
    };
    this.http.post<User>('http://localhost:8080/users/login', user).subscribe( user => {
      if(user){
        this.userBSubject.next(user);
        localStorage.setItem("user_session", user._id);
      }
    });
  }

  register(email: string, password: string, firstName: string, lastName: string, uniqueCode?: string) {
    const user: IRegister = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      uniqueCode: uniqueCode,
    };
    this.http.post<User>('http://localhost:8080/users/register', user).subscribe( user => {
      if(user){
        this.userBSubject.next(user);
  
      }
    });
  }

  updateUser(user: User) {
    this.http.put<User>('http://localhost:8080/users', user).subscribe( user => {
      if(user) {
        this.userBSubject.next(user);
      }
    })
  }
  
  logout() {
    return new Promise((resolve) => {
      this.userBSubject.next(null);
      localStorage.removeItem("user_session");
      //resolve(null);
      this.router.navigate(["/login"])
    });
  }
}
