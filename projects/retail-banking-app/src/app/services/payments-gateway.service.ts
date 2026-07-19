import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { PaymentsGatewayClient } from 'payments-gateway-sdk';
import { Transaction } from '../models/transaction';

@Injectable({ providedIn: 'root' })
export class PaymentsGatewayService {
  private readonly client = new PaymentsGatewayClient();

  constructor(private readonly http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.client
      .createSession()
      .pipe(switchMap(() => this.http.get<Transaction[]>('assets/mock-transactions.json')));
  }
}
