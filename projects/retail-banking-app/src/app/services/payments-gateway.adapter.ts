import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentsGatewayClient, GatewaySession } from 'payments-gateway-sdk';

export type { GatewaySession };

/**
 * Adapter isolating the vendored payments-gateway-sdk from the rest of the app.
 * The SDK is resolved via a tsconfig path mapping rather than an npm dependency,
 * so its Angular peer-dependency range does not constrain workspace upgrades.
 */
@Injectable({ providedIn: 'root' })
export class PaymentsGatewayAdapter {
  private readonly client = new PaymentsGatewayClient();

  createSession(): Observable<GatewaySession> {
    return this.client.createSession();
  }
}
