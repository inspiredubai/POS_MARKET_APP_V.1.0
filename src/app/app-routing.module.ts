import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { ReceiptReportComponent } from './report/receipt-report/receipt-report.component';
import { SalesReportComponent } from './report/sales-report/sales-report.component';
import { ReportComponent } from './report/report/report.component';
import { SalesComponent } from './customer/sales/sales.component';
import { BillWiseReceiptComponent } from './customer/bill-wise-receipt/bill-wise-receipt.component';
import { HomePage } from './home/home.page';
import { ItemWiseSalesReturnComponent } from './customer/item-wise-sales-return/item-wise-sales-return.component';
import { QrcodeComponent } from './home/qrcode/qrcode.component';
import { MapComponent } from './customer/map/map.component';
import { LocationDetailsComponent } from './customer/location.details/location.details.component';
import { StockReportComponent } from './report/stock-report/stock-report.component';

const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  // },

  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },



];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      { path: 'customer', component: CustomerComponent },
      { path: 'report', component: ReportComponent },
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'qrcode',
        component: QrcodeComponent, 
      },
      {path:'locationdetails', component:  LocationDetailsComponent},
      {path:'map', component:MapComponent},
      { path: 'customerdetail', component: CustomerDetailComponent },
      { path: 'sales-report', component: SalesReportComponent },
      { path: 'receipt-report', component: ReceiptReportComponent },
      { path: 'stock-report', component: StockReportComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'billwisereceipt', component: BillWiseReceiptComponent },
      {path:'itemwisesalesreturn', component:ItemWiseSalesReturnComponent},

      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          {
            path: 'home',
            component: HomePage,
          },
          {
            path: 'home',
            loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
          },
          {
            path: 'report',
            loadChildren: () => import('./report/report.module').then((m) => m.ReportModule),
          },
          {
            path: 'customer',
            loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
          },
          {
            path: 'vanstock',
            loadChildren: () => import('./vanstock/vanstock.module').then((m) => m.VanstockModule),
          },
        ],
      },
    ]),
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
