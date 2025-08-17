import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent  implements OnInit {

  constructor(private router: Router) { }
  showSales(){
    this.router.navigate(['/dashboard/customer/sales']);
  }
  showBillWiseReceipt(){
    this.router.navigate(['/dashboard/customer/billwisereceipt']);

  }
  showItemWiseSalesReturn(){
    this.router.navigate(['/dashboard/customer/itemwisesalesreturn']);
  }
  ngOnInit() {}

}
