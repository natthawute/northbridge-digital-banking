"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsGatewayClient = void 0;
var rxjs_1 = require("rxjs");
var PaymentsGatewayClient = /** @class */ (function () {
    function PaymentsGatewayClient() {
    }
    PaymentsGatewayClient.prototype.createSession = function () {
        return (0, rxjs_1.of)({
            sessionId: 'pg-session-0001',
            gatewayVersion: '2.4.1',
            establishedAt: new Date().toISOString()
        });
    };
    return PaymentsGatewayClient;
}());
exports.PaymentsGatewayClient = PaymentsGatewayClient;
