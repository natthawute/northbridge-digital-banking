import { Injectable } from '@angular/core';
import { AccountSummary } from '../models/transaction';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  getAccountSummaries(): AccountSummary[] {
    return [
      { name: 'Everyday Checking', type: 'Checking', number: '•••• 4821', balance: '$8,245.19' },
      { name: 'High-Yield Savings', type: 'Savings', number: '•••• 7710', balance: '$23,904.55' },
      { name: 'Northbridge Rewards Card', type: 'Credit', number: '•••• 0937', balance: '-$1,362.40' }
    ];
  }
}
