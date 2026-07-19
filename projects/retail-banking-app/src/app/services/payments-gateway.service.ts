import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { PaymentsGatewayAdapter } from './payments-gateway.adapter';
import { Transaction } from '../models/transaction';

@Injectable({ providedIn: 'root' })
export class PaymentsGatewayService {
  constructor(
    private readonly http: HttpClient,
    private readonly gateway: PaymentsGatewayAdapter
  ) {}

  getTransactions(): Observable<Transaction[]> {
    return this.gateway
      .createSession()
      .pipe(switchMap(() => this.http.get<Transaction[]>('assets/mock-transactions.json')));
  }
}
