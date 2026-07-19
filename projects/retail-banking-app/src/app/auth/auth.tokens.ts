import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export const AUTH_TOKEN = new InjectionToken<string>('AUTH_TOKEN', {
  providedIn: 'root',
  factory: () => environment.fakeAuthToken
});
