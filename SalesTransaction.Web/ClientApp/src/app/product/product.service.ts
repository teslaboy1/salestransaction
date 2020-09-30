import { WebApiService } from 'src/core/services/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
}
)
export class ProductService {

    constructor(private api: WebApiService) {}

    getAllProductDetail() {
        return this.api.get('product/allproductdetail');
    }

    addProduct(json): Observable<any> {
        return this.api.post('product/addproduct', json);
    }

    editProduct(json): Observable<any> {
        return this.api.post('product/editproduct', json);
    }

}
