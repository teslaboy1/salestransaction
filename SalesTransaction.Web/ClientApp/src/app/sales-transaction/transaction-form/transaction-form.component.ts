import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/core/services/utility.service';
import { MvAddTransaction } from '../sales-transaction.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit, AfterViewInit {

  customerForm: FormGroup;
  action: string;
  // tslint:disable-next-line: radix
  userId = parseInt(localStorage.getItem('userId'));
  selectedTransaction: MvAddTransaction = <MvAddTransaction>{};

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilityService: UtilityService) {
      this.action = data.action;
      this.selectedTransaction = data.data || {};
     }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerId: ['', Validators.required],
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      rate: ['', Validators.required],
      totalAmount: ['', Validators.required],
      insertPersonId: [ this.userId ]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.selectedTransaction);
  }
  onClose() {
    this.dialogRef.close();
    this.utilityService.openSnackBar('Operation Cancelled', 'warn');
  }
  ngAfterViewInit() {
    this.customerForm.updateValueAndValidity();
  }
}

