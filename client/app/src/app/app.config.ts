import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
// import { TodoService } from './services/todos/todo.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const localProviders = [
  // TodoService
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(CommonModule),
    // ...localProviders
  ]
};
