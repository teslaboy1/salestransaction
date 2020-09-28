import { WebApiService } from 'src/core/services/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ProductService {

    constructor(private api: WebApiService) {

    }

    addProduct(json): Observable<any> {
    return this.api.post('product/addproduct', json);
    }

    editProduct(json): Observable<any> {
    return this.api.post('product/editproduct', json);
    }

    getAllProductDetail() {
    return this.api.get('product/allproductdetail');
    }

    }