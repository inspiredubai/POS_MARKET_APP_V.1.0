import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl: string = environment.cutomerApiBaseUrl;
  constructor(private httpClient: HttpClient) { }

  getCustomersList(){
    return this.httpClient.get(this.baseUrl + 'SalesVoucher/LoadCustomerDropdown');
  }

}
