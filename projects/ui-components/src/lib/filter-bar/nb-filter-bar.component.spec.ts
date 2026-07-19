import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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

  it('should render MDC form field internals (.mat-mdc-form-field-flex)', () => {
    const flex = fixture.nativeElement.querySelector('.mat-mdc-form-field-flex');
    expect(flex).withContext('expected MDC .mat-mdc-form-field-flex element').not.toBeNull();
  });

  it('should render the account-type select with the .mat-mdc-select class', () => {
    const select = fixture.nativeElement.querySelector('.mat-mdc-select');
    expect(select).withContext('expected MDC .mat-mdc-select element').not.toBeNull();
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
