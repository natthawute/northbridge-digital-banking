import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentsGatewayClient } from 'payments-gateway-sdk';

/**
 * Local mirror of the SDK's session shape so the rest of the app has no
 * type coupling to `payments-gateway-sdk`.
 */
export interface PaymentsGatewaySession {
  sessionId: string;
  gatewayVersion: string;
  establishedAt: string;
}

/**
 * Adapter isolating all usage of the vendored `payments-gateway-sdk`.
 * The SDK pins `@angular/core@^14` as a peer dependency; confining it here
 * keeps the rest of the app decoupled while the workspace upgrades.
 */
@Injectable({ providedIn: 'root' })
export class PaymentsGatewayAdapter {
  private readonly client = new PaymentsGatewayClient();

  createSession(): Observable<PaymentsGatewaySession> {
    return this.client.createSession();
  }
}
