import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VanstockComponent } from './vanstock/vanstock.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [VanstockComponent],
  imports: [IonicModule, RouterModule.forChild([{ path: '', component: VanstockComponent }])],
  exports: [VanstockComponent],
})
export class VanstockModule { }
