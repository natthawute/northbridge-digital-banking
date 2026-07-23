import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { NbFilterBarComponent, NbFilterCriteria } from './nb-filter-bar.component';

describe('NbFilterBarComponent', () => {
  let fixture: ComponentFixture<NbFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NbFilterBarComponent],
      imports: [NoopAnimationsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NbFilterBarComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render legacy form field internals (.mat-form-field-flex)', () => {
    const flex = fixture.nativeElement.querySelector('.mat-form-field-flex');
    expect(flex).withContext('expected legacy .mat-form-field-flex element').not.toBeNull();
  });

  it('should render the account-type select with the legacy .mat-select class', () => {
    const select = fixture.nativeElement.querySelector('.mat-select');
    expect(select).withContext('expected legacy .mat-select element').not.toBeNull();
  });

  it('should emit filter criteria when the search value changes', () => {
    const component = fixture.componentInstance;
    let emitted: NbFilterCriteria | undefined;
    component.filterChange.subscribe((criteria) => (emitted = criteria));
    component.search = 'coffee';
    component.emitChange();
    expect(emitted).toEqual({ search: 'coffee', accountType: '', date: '' });
  });
});
