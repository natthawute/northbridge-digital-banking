import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentsGatewayService } from './payments-gateway.service';
import { Transaction } from '../models/transaction';

describe('PaymentsGatewayService', () => {
  let service: PaymentsGatewayService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(PaymentsGatewayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should fetch transactions through the payments gateway', () => {
    const mock: Transaction[] = [
      { date: '2024-05-28', merchant: 'Harborview Grocers', category: 'Groceries', amount: '-$86.42' }
    ];

    let received: Transaction[] | undefined;
    service.getTransactions().subscribe((transactions) => (received = transactions));

    httpMock.expectOne('assets/mock-transactions.json').flush(mock);
    expect(received).toEqual(mock);
  });
});
