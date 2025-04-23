import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent  implements OnInit {
  searchQuery: string = '';
  customers: Array<{ name: string, address: string, balance: number }> = [
    { name: 'AHAN SUPERMARKET', address: 'Address', balance: 5.50 },
    { name: 'AL ADIL TRADING CO. LLC', address: 'Address', balance: 100.00 },
    { name: 'AL AJWAH AL THAHABIAH SUPERMARKET', address: 'Address', balance: 0.00 },
    { name: 'AL AUDI AL MAHIRAH CAFETERIA', address: 'Sea Port', balance: 0.00 },
    { name: 'AL FESOOL AL ARBAAAH GROCERY', address: 'Al Qasimia', balance: 0.00 },
    { name: 'AL HAFAW GROCERY', address: 'Address', balance: 0.00 },
    { name: 'AL HALA GROCERY', address: 'Qasimia', balance: 0.00 },
    { name: 'AL HAMRA CINEMA', address: 'Rolla', balance: 0.00 },
    { name: 'AL HISAS SUPERMARKET', address: 'Address', balance: 0.00 },
  ];
  filteredCustomers: Array<{ name: string, address: string, balance: number }> = [];

  constructor(private router: Router) {
    this.filteredCustomers = this.customers;
  }
  onCustomerClick() {
      // Navigate to the desired component, passing customer data if needed
      this.router.navigate(['/customerdetail']);
    }
    showMap() {
      // Navigate to the desired component, passing customer data if needed
      this.router.navigate(['/map']);
    }
  ngOnInit() {
   
  }

  filterCustomers(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(query)
    );
  }
}
