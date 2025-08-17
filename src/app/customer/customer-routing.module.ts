import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LocationDetailsComponent } from "./location.details/location.details.component";
import { BillWiseReceiptComponent } from "./bill-wise-receipt/bill-wise-receipt.component";
import { ItemWiseSalesReturnComponent } from "./item-wise-sales-return/item-wise-sales-return.component";
import { MapComponent } from "./map/map.component";
import { ReceiptReportComponent } from "../report/receipt-report/receipt-report.component";
import { SalesReportComponent } from "../report/sales-report/sales-report.component";
import { StockReportComponent } from "../report/stock-report/stock-report.component";
import { CustomerDetailComponent } from "./customer-detail/customer-detail.component";
import { SalesComponent } from "./sales/sales.component";
import { CustomerComponent } from "./customer/customer.component";

const routes: Routes = [
    { path: 'billwisereceipt', component: BillWiseReceiptComponent },
    { path: 'itemwisesalesreturn', component: ItemWiseSalesReturnComponent },
    { path: 'map', component: MapComponent },
    { path: 'locationdetails', component: LocationDetailsComponent },
    { path: 'locationdetails', component: LocationDetailsComponent },
    { path: 'customerdetail', component: CustomerDetailComponent },
    { path: 'sales-report', component: SalesReportComponent },
    { path: 'receipt-report', component: ReceiptReportComponent },
    { path: 'stock-report', component: StockReportComponent },
    { path: 'sales', component: SalesComponent },
    { path: '', component: CustomerComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
