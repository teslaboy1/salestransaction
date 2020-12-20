import { CustomerService } from './../../customer/customer.service';
import { MvProduct } from './../../product/product.model';
import { ProductService } from './../../product/product.service';
import { MvNewSalesTransaction } from './../sales-transaction.model';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/core/services/utility.service';
import { MatTableDataSource } from '@angular/material/table';
import { concat } from 'rxjs';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class SalesTransactionFormComponent implements OnInit, AfterViewInit {

  salesTransactionForm: FormGroup;
  action: string;
  // tslint:disable-next-line: radix
  userId = parseInt(localStorage.getItem('userId'));
  selectedSalesTransaction: MvNewSalesTransaction = <MvNewSalesTransaction>{};

  productList = [];
  customerList = [];


  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<SalesTransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilityService: UtilityService,
    private productService: ProductService,
    private customerService: CustomerService) {
      this.action = data.action;
      this.selectedSalesTransaction = data.data || {};
    }

  ngOnInit(): void {
    this.salesTransactionForm = this.fb.group({
      productId: [this.selectedSalesTransaction.productId, Validators.required],
      customerId: [this.selectedSalesTransaction.customerId, Validators.required],
      quantity: [this.selectedSalesTransaction.quantity, [Validators.required, Validators.pattern('[0-9]*')]],
      insertPersonId: [ this.userId ]
    });
    this.getProducts();
    this.getCustomers();
  }

  getProducts(){
    this.productService.getAllProductDetail().subscribe(products => {
      if (products && products.data){
        products.data.forEach(product => {
          if (product.productId){
            this.productList.push({
              id: product.productId,
              name: product.productName
            });
          }
        });
      }
    });
  }
  getCustomers(){
    this.customerService.getAllCustomerDetail().subscribe(customers => {
      if (customers && customers.data){
        customers.data.forEach(customer => {
          if (customer.customerId){
            this.customerList.push({
              id: customer.customerId,
              name: `${customer.lastName}, ${customer.firstName} ${customer.middleName}`
            });
          }
        });
      }
    });
  }

  onSubmit(){
    // console.log(this.selectedSalesTransaction);
    this.dialogRef.close(this.selectedSalesTransaction);
  }
  onClose(){
    this.dialogRef.close();
    this.utilityService.openSnackBar('Operation Cancelled', 'warn');
  }

  ngAfterViewInit() {
    this.salesTransactionForm.updateValueAndValidity();
  }

}
