import { MvInvoiceDetail, MvInvoiceDescription } from './../invoice.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

  salesData: MvInvoiceDescription = <MvInvoiceDescription>{};
  selectedInvoice: MvInvoiceDetail = <MvInvoiceDetail>{};
  salesTotal = 0;

  constructor(
    private dialogRef: MatDialogRef<InvoiceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedInvoice = this.data.invoice;
    this.salesData = this.data.invoiceDescription.data;
    this.salesTotal = this.selectedInvoice.amount;

  }

  ngOnInit(): void {
  }


  onPrint() {
    this.dialogRef.close('print');
  }
  onClose() {
    this.dialogRef.close('close');
  }


}
