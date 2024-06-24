import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../types/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://localhost:8080';
  // private tokenKey = 'authToken';
  // private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  http = inject(HttpClient);

  authenticatedUser$$ = new BehaviorSubject<User | null | undefined>(undefined);
  isLoggedIn$ = this.authenticatedUser$$.pipe(
    map((user) => user !== null || user !== undefined)
  );
  isAuthenticating$ = this.authenticatedUser$$.pipe(
    map((user) => user === undefined)
  );
  // isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // http = inject(HttpClient);
  // router = inject(Router);

  // private hasToken(): boolean {
  //   return !!localStorage?.getItem(this.tokenKey);
  // }

  // login(email: string, password: string): Observable<any> {
  //   return this.http
  //     .post(`${this.apiUrl}/users/login`, { email, password })
  //     .pipe(
  //       tap((response: any) => {
  //         localStorage?.setItem(this.tokenKey, response.token);
  //         this.isLoggedInSubject.next(true);
  //         this.router.navigate(['/rooms']);
  //       })
  //     );
  // }

  // register(name: string, email: string, password: string): Observable<any> {
  //   return this.http
  //     .post(`${this.apiUrl}/users/register`, { name, email, password })
  //     .pipe(
  //       tap((response: any) => {
  //         this.router.navigate(['/login']);
  //       })
  //     );
  // }

  // logout() {
  //   localStorage.removeItem(this.tokenKey);
  //   this.isLoggedInSubject.next(false);
  //   this.router.navigate(['/login']);
  // }

  authenticate() {
    return this.http.get<User | null>('/users').pipe(
      tap((user) => {
        this.authenticatedUser$$.next(user);
      }),
      catchError(() => {
        this.authenticatedUser$$.next(null);
        return [];
      })
    );
  }

  // getToken(): string | null {
  //     return localStorage?.getItem(this.tokenKey);
  // }
}
