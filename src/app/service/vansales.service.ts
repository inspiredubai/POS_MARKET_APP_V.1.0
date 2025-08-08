import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VansalesService {
  baseUrl: string = environment.apiRootURL;

  constructor(private httpClient: HttpClient) { } 

   public getItems() {
    return this.httpClient.get(this.baseUrl + 'master/item/GetAllItem');
  }
}
 