import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

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
