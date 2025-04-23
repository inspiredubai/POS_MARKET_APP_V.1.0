import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent implements OnDestroy {
  qrCodeString: string = 'this is secret QR Code message';
  scannedResult: string = '';
  isHide: boolean = true;
  content_visibility = 'visible';

  constructor(private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.initializeScanner();
    });
  }

  async initializeScanner() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (!status.granted) {
        console.error('Camera permission not granted');
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  }

  async checkPermission(): Promise<boolean> {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      
      this.isHide = false;
      this.content_visibility = 'hidden';
      await BarcodeScanner.hideBackground();

      const bodyElement = document.querySelector('body');
      if (bodyElement) {
        bodyElement.classList.add('scanner-active');
      } else {
        console.error('Body element not found.');
        return;
      }

      const result = await BarcodeScanner.startScan();
      if (result?.hasContent) {
        this.scannedResult = result.content;
      } else {
        console.warn('No content found');
      }

      this.stopScan();
    } catch (error) {
      console.log(error);
      this.stopScan();
    }
  }

  stopScan() {
    this.content_visibility = 'visible';
    this.isHide = true;
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();

    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      bodyElement.classList.remove('scanner-active');
    } else {
      console.error('Body element not found.');
    }
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

}
// }