import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { interceptor } from './htpp_intercepror';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const localProviders = [
  // TodoService
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(CommonModule),
   // provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([interceptor])),
   
    // ...localProviders
  ]
};


