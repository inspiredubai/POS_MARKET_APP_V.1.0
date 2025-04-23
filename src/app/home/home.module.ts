import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PopoveroptionComponent } from './popoveroption/popoveroption.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    QRCodeModule
  ],
  declarations: [HomePage,PopoveroptionComponent,QrcodeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomePageModule {}
