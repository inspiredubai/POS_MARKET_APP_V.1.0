import { Injectable } from '@angular/core';
import { ReportFilterModel } from '../models/ReportFilterModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrystalReportService {

  reporturl: string = environment.reportApiUrl
  baseUrl: string = environment.apiRootURL
  constructor(private httpClient: HttpClient,
    //private masterApi: MasterApiService,
  ) { }

  // public getreport1(data) {
  //   return this.httpClient.post<any[]>(this.CrystalbaseUrl + `api/cr/DynamicReportCall`, data);
  // }

  // public getreport(data: any): Observable<any> {
  //   const rptOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //     responseType: 'blob' as 'blob',
  //   };

  //   return this.httpClient.post(this.CrystalbaseUrl + 'cr/DynamicReportCall', data, rptOptions);

  // }

  GetReportName(id:any) {
    return this.httpClient.get(this.baseUrl + `/master/GetReportName/${id}`)
  }

  public getreport2(data: any): Observable<any> {
    const rptOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'blob' as 'blob',
    };

    return this.httpClient.post(this.reporturl + 'cr/DynamicReportCall', data, rptOptions);

  }

  public getReportPrint(data: any, isByQuery: boolean) {

    const parts = this.baseUrl.split(':');

    const portAndPath = parts[2].split('/');
    const port = portAndPath[0];
    const clients = this.getClientMapping();
    let Client: string;
      Client = clients["default"];


    const rptOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'blob' as 'blob',
    };

    if (isByQuery) {
      return this.httpClient.put(this.reporturl + '/Reports/getPrintByQuery/' + Client, data, rptOptions)
    } else {

      return this.httpClient.put(this.reporturl + '/Reports/getReportPrint/' + Client, data, rptOptions)
    }
  }


  downloadReport(data: ReportFilterModel) {
    const parts = this.baseUrl.split(':');

    const portAndPath = parts[2].split('/');
    const port = portAndPath[0];
    const clients = this.getClientMapping();

    // Determine the client based on the IP address or port
    let Client: string;
    if (parts[1] === '//192.168.1.249') {
      Client = clients["192.168.1.249"];
    } else {
      Client = clients[port] || clients["default"];
    }


    const rptOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'blob' as 'blob',
    };

    return this.httpClient.put(this.reporturl + 'reports/getReportPrint/' + Client, data, rptOptions)


  }

  public getClientMapping(): { [key: string]: string } {
    return {
      "192.168.1.249": "WaterBird",
      "8088": "Hubco",
      "8094": "InspireNc",
      "8096": "Geomak",
      "8111": "mexcio",
      "8302": "Horizon",
      "8207": "Demo",
      "8326": "Springer",
      "8318": "Technomak",
      "8018": "SilverStar",
      "8015": "AceVision",
      "8034": "green",
      "8064": "NGB",
      "default": "Demo",
    };
  }
}
