import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { ProductService } from './product.service';

const routes: Routes = [{
    path: '',
    component: ProductComponent
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    CdkTableModule,
    HttpClientModule,
    MatInputModule
  ],
  declarations: [ProductComponent],
  providers: [ProductService],
  exports: [ProductComponent]
})
export class ProductModule { }
