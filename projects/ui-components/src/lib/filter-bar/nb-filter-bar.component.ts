import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface NbFilterCriteria {
  search: string;
  accountType: string;
  date: string;
}

@Component({
  selector: 'nb-filter-bar',
  templateUrl: './nb-filter-bar.component.html',
  styleUrls: ['./nb-filter-bar.component.scss']
})
export class NbFilterBarComponent {
  @Input() accountTypes: string[] = [];
  @Output() filterChange = new EventEmitter<NbFilterCriteria>();

  search = '';
  accountType = '';
  date = '';

  emitChange(): void {
    this.filterChange.emit({
      search: this.search,
      accountType: this.accountType,
      date: this.date
    });
  }
}
