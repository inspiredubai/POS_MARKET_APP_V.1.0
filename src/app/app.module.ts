import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@NgModule({
  declarations: [AppComponent,DashboardComponent],
  imports: [BrowserModule, 
    FormsModule,
    CommonModule,
    IonicModule.forRoot(),
     AppRoutingModule],
  providers: [
    // BarcodeScanner,
     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
