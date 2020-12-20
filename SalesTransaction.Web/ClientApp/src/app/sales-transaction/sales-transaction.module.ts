import { SalesTransactionComponent } from './sales-transaction.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesTransactionFormComponent } from './transaction-form/transaction-form.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatToolbarModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: SalesTransactionComponent }
];

@NgModule({
  declarations: [
    SalesTransactionComponent,
    SalesTransactionFormComponent
  ],
  entryComponents:[SalesTransactionFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatToolbarModule
  ],
  exports: [
    SalesTransactionComponent
  ],
  providers: [
    SalesTransactionComponent
  ]
})
export class SalesTransactionModule { }