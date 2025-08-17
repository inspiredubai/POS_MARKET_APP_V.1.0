import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  searchQuery: string = '';
  customers: Array<any> = [];
  filteredCustomers: Array<any> = [];
  isLoading: boolean = true;
  constructor(private router: Router, private customerService: CustomerService) {
    
  }
onCustomerClick(customer: any) {
  this.router.navigate(
    ['/dashboard/customer/customerdetail'],
    { queryParams: { customer: JSON.stringify(customer) } }
  );
}

  showMap() {
    // Navigate to the desired component, passing customer data if needed
    this.router.navigate(['/dashboard/customer/map']);
  }
  ngOnInit() {
    this.getCustomersList();
  }
getCustomersList() {
  this.isLoading = true;
  this.customerService.getCustomersList().subscribe((response: any) => {
    this.customers = response?.resultSet?.customerMasters || [];
    this.filteredCustomers = [...this.customers];

    this.filteredCustomers.forEach(x => {
      x.customerMasterCustomerAddress = 'AL AJWAH AL THAHABIAH SUPERMARKET';
    });

    this.isLoading = false; 
  }, error => {
    this.isLoading = false;
  });
}

filterCustomers(event: Event) {
  const query = (event.target as HTMLInputElement).value.toLowerCase();

  if (!query || query.trim() === '') {
    this.filteredCustomers = [...this.customers];
    return;
  }

  this.filteredCustomers = this.customers.filter(customer =>
    customer.customerMasterCustomerName?.toLowerCase().includes(query) ||
    customer.customerMasterCustomerNo?.toLowerCase().includes(query) ||
    customer.customerMasterCustomerAddress?.toLowerCase().includes(query)
  );
}

// onCustomerClick() {
//   // your click logic here
// }

}
