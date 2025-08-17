import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer/customer.component';
import { ReportComponent } from './report/report/report.component';
import { QrcodeComponent } from './home/qrcode/qrcode.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'customer', component: CustomerComponent },
  { path: 'report', component: ReportComponent },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'qrcode',
    component: QrcodeComponent,
  },
  {
    path: 'dashboard/customer',
    loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule)
  },
  {
    path: 'dashboard/report',
    loadChildren: () => import('./report/report.module').then((m) => m.ReportModule),
  },
  {
    path: 'dashboard/vanstock',
    loadChildren: () => import('./vanstock/vanstock.module').then((m) => m.VanstockModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
