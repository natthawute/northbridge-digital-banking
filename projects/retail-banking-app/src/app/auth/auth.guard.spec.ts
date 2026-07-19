import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should allow navigation when the user is authenticated', () => {
    const guard = TestBed.inject(AuthGuard);
    expect(guard.canActivate()).toBeTrue();
  });
});
