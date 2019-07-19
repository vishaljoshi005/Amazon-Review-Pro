import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './header/auth-Interceptor';
import {AuthService} from '@/core/services/auth/auth.service';

export const httpInterceptorProviders = [
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,  deps: [ AuthService] },
];
