import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductService } from './product.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MvAddProduct, MvProduct } from './product.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  userMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvProduct>;
  selectedProduct: MvAddProduct = <MvAddProduct>{};
  selection = new SelectionModel<MvProduct>(false, []);

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['productId', 'productName', 'quantityAvailable', 'actualPrice', 'startDate', 'endDate', 'manufactureDate', 'expiryDate' ];
    this.getAllProductDetail();
  }
  getAllProductDetail() {
    this.productService.getAllProductDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvProduct>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvProduct>();
        this.userMessage = 'No product available !';
      }
    });

  }

  addProduct() {
    this.selection.clear();
    this.selectedProduct = <MvProduct>{};
    this.openDialog('Add');
  }

  editProduct() {
    this.openDialog('Edit');
  }

  openDialog(action: string) {
    if (action === 'Edit' && !this.selection.hasValue()) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.panelClass = 'mat-form-dialog';
    dialogConfig.data = { data: this.selectedProduct, action: action };
    const dialogRef = this.dialog.open(ProductFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit') {
          this.productService.editProduct(result).subscribe(res => {
            this.getAllProductDetail();
          });

        } else {
          this.productService.addProduct(result).subscribe(res => {
            this.getAllProductDetail();
          });
        }
      }

    });
  }

  selectRow(e: any, row: MvProduct) {
    this.selectedProduct = { ...row };
    this.selection.toggle(row);
  }

}


