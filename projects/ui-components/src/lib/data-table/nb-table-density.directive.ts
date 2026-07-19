import { Directive, HostBinding, Input } from '@angular/core';

export type NbTableDensity = 'comfortable' | 'compact';

@Directive({
  selector: '[nbTableDensity]'
})
export class NbTableDensityDirective {
  @Input() nbTableDensity: NbTableDensity = 'comfortable';

  @HostBinding('class.nb-table-density--compact')
  get isCompact(): boolean {
    return this.nbTableDensity === 'compact';
  }
}
