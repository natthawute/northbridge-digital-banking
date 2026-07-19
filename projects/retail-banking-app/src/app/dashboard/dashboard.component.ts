import { Component, OnInit } from '@angular/core';
import { NbColumnDef, NbFilterCriteria } from '@northbridge/ui-components';
import { AccountsService } from '../services/accounts.service';
import { PaymentsGatewayService } from '../services/payments-gateway.service';
import { AccountSummary, Transaction } from '../models/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accounts: AccountSummary[] = [];
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];

  readonly accountTypes = ['Checking', 'Savings', 'Credit'];

  readonly columns: NbColumnDef[] = [
    { key: 'date', header: 'Date' },
    { key: 'merchant', header: 'Merchant' },
    { key: 'category', header: 'Category' },
    { key: 'amount', header: 'Amount' }
  ];

  constructor(
    private readonly accountsService: AccountsService,
    private readonly paymentsGateway: PaymentsGatewayService
  ) {}

  ngOnInit(): void {
    this.accounts = this.accountsService.getAccountSummaries();
    this.paymentsGateway.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;
      this.filteredTransactions = transactions;
    });
  }

  onFilterChange(criteria: NbFilterCriteria): void {
    const search = criteria.search.trim().toLowerCase();
    this.filteredTransactions = this.transactions.filter((tx) => {
      const matchesSearch =
        !search ||
        tx.merchant.toLowerCase().includes(search) ||
        tx.category.toLowerCase().includes(search);
      const matchesAccountType = !criteria.accountType || tx.accountType === criteria.accountType;
      const matchesDate = !criteria.date || tx.date === criteria.date;
      return matchesSearch && matchesAccountType && matchesDate;
    });
  }
}
