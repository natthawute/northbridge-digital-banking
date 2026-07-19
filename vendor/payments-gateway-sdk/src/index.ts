import { Observable, of } from 'rxjs';

export interface GatewaySession {
  sessionId: string;
  gatewayVersion: string;
  establishedAt: string;
}

export class PaymentsGatewayClient {
  createSession(): Observable<GatewaySession> {
    return of({
      sessionId: 'pg-session-0001',
      gatewayVersion: '2.4.1',
      establishedAt: new Date().toISOString()
    });
  }
}
