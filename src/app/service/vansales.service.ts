import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 @Injectable({
  providedIn: 'root'
})
export class VansalesService {
  baseUrl: string = environment.apiRootURL;

  constructor(private httpClient: HttpClient) { } 

   public getItems() {
    return this.httpClient.get(this.baseUrl + 'master/item/GetAllItemMaster_withUnit');
  }
 public save(item: any) {
  return this.httpClient.post(this.baseUrl + 'SalesVoucher/insertVanSales', item);
}
public getItemById(id: number) {
  return this.httpClient.get(`${this.baseUrl}master/item/GetAllItemMasterById/${id}`);
}

 public GetProgramSettingsDropdown(): Observable<any> {
  return this.httpClient.get<any[]>(
    this.baseUrl + '/settings/LoadDropdown'
  );
}

}
 