import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NbDataTableComponent } from './nb-data-table.component';

describe('NbDataTableComponent', () => {
  let fixture: ComponentFixture<NbDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NbDataTableComponent],
      imports: [MatTableModule, MatButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NbDataTableComponent);
  });

  it('should render one row per data source entry', () => {
    const component = fixture.componentInstance;
    component.columns = [
      { key: 'merchant', header: 'Merchant' },
      { key: 'amount', header: 'Amount' }
    ];
    component.dataSource = [
      { merchant: 'Cobalt Coffee Co.', amount: '-$7.85' },
      { merchant: 'Harborview Grocers', amount: '-$86.42' },
      { merchant: 'City Utilities', amount: '-$142.13' }
    ];
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tr.mat-row');
    expect(rows.length).toBe(3);
  });
});
