import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    apiUrl = 'http://localhost:56399';

    constructor(private httpClient: HttpClient){}

    getLogin(json): Observable<any>{

            return this.httpClient.post(this.apiUrl + '/login', json, { headers: this.getHeaderOptions()});
          }

    getHeaderOptions(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Method', 'GET,POST');
        headers.set('Access-Control-Allow-Origin', 'Origin, Content-Type');
        return headers;
    }
    }
