import { Observable } from 'rxjs';
export interface GatewaySession {
    sessionId: string;
    gatewayVersion: string;
    establishedAt: string;
}
export declare class PaymentsGatewayClient {
    createSession(): Observable<GatewaySession>;
}
