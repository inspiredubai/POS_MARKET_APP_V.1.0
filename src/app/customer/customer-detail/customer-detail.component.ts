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
    this.router.navigate(['/sales']);
  }
  showBillWiseReceipt(){
    this.router.navigate(['/billwisereceipt']);

  }
  showItemWiseSalesReturn(){
    this.router.navigate(['/itemwisesalesreturn']);
  }
  ngOnInit() {}

}
