import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/core/services/utility.service';
import { MvAddTransaction, MvTransaction } from './sales-transaction.model';
import { TransactionService } from './sales-transaction.service';

@Component({
  selector: 'app-sales-transaction',
  templateUrl: './sales-transaction.component.html',
  styleUrls: ['./sales-transaction.component.scss']
})
export class SalesTransactionComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvTransaction>;
  errorMessage = '';
  selectedTransaction: MvAddTransaction = <MvAddTransaction>{};
  selection = new SelectionModel<MvTransaction>(false, []);

  constructor(private transactionService: TransactionService,
    private dialog: MatDialog,
    private utilityService: UtilityService) { }

  ngOnInit(): void  {
    this.displayedColumns = ['customerId', 'productId', 'quantity', 'rate', 'totalAmount'];
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getAllTransactionDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvTransaction>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvTransaction>();
        this.errorMessage = 'No data';
      }
    });
  }

  onAdd() {
    this.selection.clear();
    this.selectedTransaction = <MvTransaction>{};
    this.openDialog('Add');
  }
  onEdit() {
    this.openDialog('Edit');
  }

  openDialog(action: string) {
    if (action === 'Edit' && !this.selection.hasValue()){
      this.utilityService.openSnackBar('Please Select Row first', 'warn');
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.panelClass = 'mat-form-dialog';
    dialogConfig.data = {data: this.selectedTransaction, action: action};
    const dialogRef = this.dialog.open(SalesTransactionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit') {
          this.transactionService.editTransaction(result).subscribe(res => {
            this.utilityService.openSnackBar('Transaction Edited', 'success');
            this.getAllTransactions();
          });

        } else {
          this.transactionService.addTransaction(result).subscribe(res => {
            this.utilityService.openSnackBar('Transaction added successfully', 'success');
            this.getAllTransactions();
          });
        }
      }

    });
  }

  selectRow(e: any, row: MvTransaction){
    this.selectedTransaction = {...row};
    this.selection.toggle(row);
  }

}
