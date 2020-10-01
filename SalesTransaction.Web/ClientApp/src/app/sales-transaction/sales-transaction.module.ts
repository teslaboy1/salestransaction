import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../shared/material.module';
import { ProductFormComponent } from './../product/product-form/product-form.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { SalesTransactionComponent } from './sales-transaction.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: SalesTransactionComponent}
];


@NgModule({
  declarations: [
    SalesTransactionComponent,
    TransactionFormComponent
  ],
  entryComponents:[TransactionFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatToolbarModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule
  ],
  exports: [
    SalesTransactionComponent
  ],
  providers: [
    SalesTransactionComponent
  ]
})
export class TransactionModule { }
