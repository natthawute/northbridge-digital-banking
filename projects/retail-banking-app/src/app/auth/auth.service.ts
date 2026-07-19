import { Inject, Injectable } from '@angular/core';
import { AUTH_TOKEN } from './auth.tokens';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(@Inject(AUTH_TOKEN) private readonly token: string) {}

  isAuthenticated(): boolean {
    return this.token.length > 0;
  }

  getToken(): string {
    return this.token;
  }
}
