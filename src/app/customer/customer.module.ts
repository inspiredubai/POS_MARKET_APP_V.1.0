import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { SalesComponent } from './sales/sales.component';
import { BillWiseReceiptComponent } from './bill-wise-receipt/bill-wise-receipt.component';
import { ItemWiseSalesReturnComponent } from './item-wise-sales-return/item-wise-sales-return.component';
import { MapComponent } from './map/map.component';
import { LocationDetailsComponent } from './location.details/location.details.component';



@NgModule({
  
  declarations: [CustomerComponent,CustomerDetailComponent,SalesComponent,BillWiseReceiptComponent,ItemWiseSalesReturnComponent,LocationDetailsComponent,MapComponent],
  imports: [IonicModule, FormsModule,CommonModule, RouterModule.forChild([{ path: '', component: CustomerComponent },
  {path:'billwisereceipt', component:BillWiseReceiptComponent},
{path:'itemwisesalesreturn', component:ItemWiseSalesReturnComponent},
  {path:'map', component:MapComponent},
  {path:'locationdetails', component:  LocationDetailsComponent},
  ])],
  exports: [CustomerComponent,],

})
export class CustomerModule { }
