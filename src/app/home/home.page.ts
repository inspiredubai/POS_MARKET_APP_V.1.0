import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoveroptionComponent } from './popoveroption/popoveroption.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedBranch: string;
  branches: string[] = ['Ajman', 'Dubai', 'Sharjah'];
  user: any;
  // showLogin(){
  //   this.router.navigate(['/auth/login']);
  // }

  constructor(private router: Router,
    private popoverController: PopoverController
  ) {
    this.selectedBranch = 'Ajman';
    this.user = {
      login: 'Nik005',
      company: 'MUSHAIREF ROASTERY LLC',
      branch: 'Ajman',
      tax: 'Yes',
      van: 'VAN 7970',
      shiftId: '13360',
      shiftStart: '11-07-2024 08:45 am'
    };

  }

 
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoveroptionComponent,
      event: ev,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    if (data) {
      this.handleOption(data);
    }
  }

  handleOption(option: string) {
    if (option === 'logout') {
      this.logout();
    } else if (option === 'qrcode') {
      this.showQRCode();
    }
  }

  logout() {
    this.router.navigate(['/auth/login']);
    // Add your logout logic here
  }

  showQRCode() {
    this.router.navigate(['/qrcode']);
    // Add your QR Code display logic here
  }
  closeShift() {
    console.log('Shift closed');
    // Add your logic to handle the shift closure
  }

}
