import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthService } from './services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { ClienteService } from './services/cliente-service.service';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideClientHydration(withEventReplay()), 
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    AuthService,
    FormsModule,
    ClienteService
  ]
};
