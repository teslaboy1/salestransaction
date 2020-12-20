import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTransactionFormComponent } from './transaction-form.component';

describe('SalesTransactionFormComponent', () => {
  let component: SalesTransactionFormComponent;
  let fixture: ComponentFixture<SalesTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesTransactionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});