import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent  implements OnInit {
  customer: any;


constructor(private route: ActivatedRoute,private router: Router) {
  this.route.queryParams.subscribe(params => {
    if (params['customer']) {
    this. customer= JSON.parse(params['customer']);
    
      console.log("Received customer:", this.customer);
    }
  });
}
  showSales(){
    this.router.navigate(['/dashboard/customer/sales'], { queryParams: { customer: JSON.stringify(this.customer) } });
  }
  showBillWiseReceipt(){
    this.router.navigate(['/dashboard/customer/billwisereceipt']);

  }
  showItemWiseSalesReturn(){
    this.router.navigate(['/dashboard/customer/itemwisesalesreturn']);
  }
  ngOnInit() {}

}
