import { Component, Input } from '@angular/core';

export interface NbColumnDef {
  key: string;
  header: string;
}

@Component({
  selector: 'nb-data-table',
  templateUrl: './nb-data-table.component.html',
  styleUrls: ['./nb-data-table.component.scss']
})
export class NbDataTableComponent {
  @Input() columns: NbColumnDef[] = [];
  @Input() dataSource: object[] = [];
  @Input() legacyPagination = false;

  pageIndex = 0;
  pageSize = 10;

  get columnKeys(): string[] {
    return this.columns.map((c) => c.key);
  }

  get rows(): object[] {
    if (!this.legacyPagination) {
      return this.dataSource;
    }
    const start = this.pageIndex * this.pageSize;
    return this.dataSource.slice(start, start + this.pageSize);
  }

  cellValue(row: object, key: string): unknown {
    return (row as Record<string, unknown>)[key];
  }

  get hasNextPage(): boolean {
    return (this.pageIndex + 1) * this.pageSize < this.dataSource.length;
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.pageIndex++;
    }
  }
}
