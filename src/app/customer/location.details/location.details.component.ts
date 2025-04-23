import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Customers } from '../constant/constant';

@Component({
  selector: 'app-location.details',
  templateUrl: './location.details.component.html',
  styleUrls: ['./location.details.component.scss'],
})
export class LocationDetailsComponent  implements OnInit {
  customers: any = Customers;
  selectedCustomer:any
    constructor(private activatedRoute:ActivatedRoute,private router:Router) {
      addIcons({ arrowBackOutline })
  
     }
  
    ngOnInit() {
      this.activatedRoute.queryParams.subscribe((res:any) =>{
        if(res){
          this.selectedCustomer = this.customers.find((customer:any) => customer.userid === Number(res.id));
        }
      })
    }
    viewDirection(){
      window.open(`${this.selectedCustomer.direction}`)
    }
    backButton(){
      this.router.navigate(['map']);
  
    }

}
