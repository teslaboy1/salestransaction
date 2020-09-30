import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { CustomerComponent } from './customer.component';
import { CustomerService } from './customer.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

const routes: Routes = [{
    path: '',
    component: CustomerComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    ScrollingModule,
    HttpClientModule,
    CdkTableModule,
    MatInputModule,
    MatToolbarModule
  ],
  entryComponents: [CustomerFormComponent],
  declarations: [CustomerComponent, CustomerFormComponent],
  providers: [CustomerService],
  exports: [CustomerComponent]
})
export class CustomerModule { }