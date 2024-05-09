import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { UserState } from './state-management/user/user.state';
import { HttpInterceptorService } from './services/http-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideHttpClient(),
    importProvidersFrom(
      NgxsModule.forRoot([UserState]),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxsLoggerPluginModule.forRoot(),
      HttpClientModule
    ),
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
    }
  ]
};
