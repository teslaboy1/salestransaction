import { InvoiceService } from './../invoice/invoice.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/core/services/utility.service';
import { SalesTransactionFormComponent } from './transaction-form/transaction-form.component';
import { MvNewSalesTransaction, MvSalesTransactionDetail } from './sales-transaction.model';
import { SalesTransactionService } from './sales-transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-transaction',
  templateUrl: './sales-transaction.component.html',
  styleUrls: ['./sales-transaction.component.scss']
})
export class SalesTransactionComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvSalesTransactionDetail>;
  errorMessage = '';
  selectedSalesTransaction: MvNewSalesTransaction = <MvNewSalesTransaction>{};
  selection = new SelectionModel<MvSalesTransactionDetail>(false, []);
  selectionCheckBox = new SelectionModel<MvSalesTransactionDetail>(true, []);

  constructor(private salesTransactionService: SalesTransactionService,
    private dialog: MatDialog,
    private utilityService: UtilityService,
    private invoiceService: InvoiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.displayedColumns = ['select', 'salesTransactionId', 'customerName', 'productName', 'quantity', 'rate', 'totalAmount', 'invoiceId'];
    this.getAllSalesTransaction();
  }

  getAllSalesTransaction(){
    this.salesTransactionService.getTransaction().subscribe((response: any) => {
      if (response && response.data){
        this.dataSource = new MatTableDataSource<MvSalesTransactionDetail>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvSalesTransactionDetail>();
        this.errorMessage = 'No data';
      }
    });
  }

  onAdd(){
    this.selection.clear();
    this.selectedSalesTransaction = <MvSalesTransactionDetail>{};
    this.openDialog('Add');
  }
  onEdit(){
    this.openDialog('Edit');
  }

  openDialog(action: string){
    if (action === 'Edit' && !this.selection.hasValue()){
      this.utilityService.openSnackBar('Please Select Row first', 'warn');
      return;
    }else if(this.hasInvoice(this.selection.selected)){
      this.utilityService.openSnackBar('Cannot edit transaction whose invoice is already created', 'warn');
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.panelClass = 'mat-form-dialog';
    dialogConfig.data = {data: this.selectedSalesTransaction, action: action};
    const dialogRef = this.dialog.open(SalesTransactionFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit'){
          this.salesTransactionService.updateTransaction(result).subscribe(res => {
            this.utilityService.openSnackBar('Sales Transaction Edited', 'success');
            this.getAllSalesTransaction();
          });

        } else {
          this.salesTransactionService.addTransaction(result).subscribe(res => {
            this.utilityService.openSnackBar('Sales Transaction added successfully', 'success');
            this.getAllSalesTransaction();
          });
        }
      }

    });

  }

  selectRow(e: any, row: MvSalesTransactionDetail) {
    this.selectedSalesTransaction = {...row};
    this.selection.toggle(row);
    this.selectionCheckBox.toggle(row);
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectionCheckBox.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selectionCheckBox.select(row) );
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: MvSalesTransactionDetail): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.salesTransactionId + 1}`;
  }

  generateInvoice(){
    if (!this.selectionCheckBox.hasValue()){
      this.utilityService.openSnackBar('Please select at least one sale to generate Invoice', 'warn');
      return;
    } else {
      if(this.hasInvoice(this.selectionCheckBox.selected)){
        this.utilityService.openSnackBar('Please select row which does not have Invoice', 'warn');
        return;
      } else if (!this.sameCustomer(this.selectionCheckBox.selected)){
        this.utilityService.openSnackBar('Please select sales of same customer', 'warn');
      } else {
        this.invoiceService.addInvoice(this.selectionCheckBox.selected).subscribe(response =>{
          this.router.navigate(['/invoice']);
          this.getAllSalesTransaction();
          this.utilityService.openSnackBar('Invoice Generated', 'success');
        });
      }
    }
  }

  hasInvoice(array): boolean{
    let invoice = false;
    array.forEach(object => {
      if(object.invoiceId){
        invoice = true;
        return;
      }
    });
    return invoice;
  }

  sameCustomer(array):boolean{
    const customer = array[0].customerId;
    return array.every(obj => obj.customerId === customer );
  }

}