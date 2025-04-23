import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { ReceiptReportComponent } from './receipt-report/receipt-report.component';
import { FormsModule } from '@angular/forms';
import { StockReportComponent } from './stock-report/stock-report.component';



@NgModule({
  declarations: [ReportComponent,SalesReportComponent,ReceiptReportComponent,StockReportComponent],
  imports: [IonicModule, FormsModule,CommonModule, RouterModule.forChild([{ path: '', component: ReportComponent },

  ])],
  exports: [ReportComponent],
})
export class ReportModule { }
