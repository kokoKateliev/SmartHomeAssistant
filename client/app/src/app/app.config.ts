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
import { AuthService } from './components/auth/auth.service';
import { AuthGuard } from './components/auth/auth.guard';
import { interceptor } from './htpp_intercepror';


const localProviders = [
  // TodoService
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRouter(routes),
    provideHttpClient(withInterceptors([interceptor])),
  ]
};
