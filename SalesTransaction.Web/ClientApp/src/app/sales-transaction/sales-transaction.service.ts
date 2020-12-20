import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from '../../core/services/web-api.service';


@Injectable({
  providedIn: 'root'
})
export class SalesTransactionService {

constructor(private api: WebApiService) { }
addTransaction(json: any): Observable<any> {
  return this.api.post('transaction/AddTransaction', json);
 }
getTransaction() {
  return this.api.get('transaction/AllTransactionDetail');
}
updateTransaction(json: any): Observable<any> {
  return this.api.post('transaction/EditTransaction', json);
}

}
