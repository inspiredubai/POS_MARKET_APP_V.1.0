import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customers } from '../constant/constant';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit {
  // users: any;
  users: any = Customers;
  filteredCustomers: any;
  searchCity: any
  constructor(private router:Router) { }

  ngOnInit() { }
  filterByCity(): void {
    console.log('this.searchCity: ', this.searchCity);
    this.filteredCustomers = this.users.filter((customer: any) =>
      customer.city.toLowerCase().includes(this.searchCity.toLowerCase())
    );
  }
  details(userid:any){
    this.router.navigate(['locationdetails'],{queryParams:{id:userid}})
  }

}
