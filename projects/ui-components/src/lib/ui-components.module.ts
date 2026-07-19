import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { NbFilterBarComponent } from './filter-bar/nb-filter-bar.component';
import { NbDataTableComponent } from './data-table/nb-data-table.component';
import { NbTableDensityDirective } from './data-table/nb-table-density.directive';

@NgModule({
  declarations: [NbFilterBarComponent, NbDataTableComponent, NbTableDensityDirective],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [NbFilterBarComponent, NbDataTableComponent, NbTableDensityDirective]
})
export class NbUiComponentsModule {}
