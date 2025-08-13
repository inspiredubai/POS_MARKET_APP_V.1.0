import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = environment.apiRootURL;

  constructor(    private httpClient: HttpClient,
) { }
   public loginRequest(data1: any) {
    return this.httpClient.post(this.baseUrl + 'authenticate', data1);
  }
}
