import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NbUiComponentsModule } from '@northbridge/ui-components';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule, NoopAnimationsModule, NbUiComponentsModule]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    httpMock.expectOne('assets/mock-transactions.json').flush([
      { date: '2024-05-28', merchant: 'Harborview Grocers', category: 'Groceries', amount: '-$86.42' }
    ]);
    fixture.detectChanges();
  });

  it('should create and render the three account summary cards', () => {
    expect(fixture.componentInstance).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.account-card');
    expect(cards.length).toBe(3);
  });
});
