import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { SalesComponent } from './sales/sales.component';
import { BillWiseReceiptComponent } from './bill-wise-receipt/bill-wise-receipt.component';
import { ItemWiseSalesReturnComponent } from './item-wise-sales-return/item-wise-sales-return.component';
import { MapComponent } from './map/map.component';
import { LocationDetailsComponent } from './location.details/location.details.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CustomerService } from '../service/customer.service';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({

  declarations: [CustomerComponent, CustomerDetailComponent, BillWiseReceiptComponent, ItemWiseSalesReturnComponent, LocationDetailsComponent, MapComponent],
  imports: [IonicModule, FormsModule, CommonModule,HttpClientModule, CustomerRoutingModule,
    ReactiveFormsModule, SharedModule],
  exports: [CustomerComponent,],
  providers: [CustomerService, provideHttpClient(withFetch())]
})
export class CustomerModule { }
