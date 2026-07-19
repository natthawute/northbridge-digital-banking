export interface Transaction {
  date: string;
  merchant: string;
  category: string;
  amount: string;
}

export interface AccountSummary {
  name: string;
  type: string;
  number: string;
  balance: string;
}
