import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { TokenInterceptor } from './components/auth/token.interceptor';
import { AuthService } from './components/auth/auth.service';
import { AuthGuard } from './components/auth/auth.guard';


const localProviders = [
  // TodoService
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(CommonModule),
    // importProvidersFrom(HttpClient),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthService,
    AuthGuard,
    provideHttpClient(withFetch()),
   
  ]
};
