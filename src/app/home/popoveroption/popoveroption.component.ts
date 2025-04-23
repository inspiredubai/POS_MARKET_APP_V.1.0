import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popoveroption',
  templateUrl: './popoveroption.component.html',
  styleUrls: ['./popoveroption.component.scss'],
})
export class PopoveroptionComponent  implements OnInit {

  constructor(private popoverController: PopoverController) {}

  selectOption(option: string) {
    this.popoverController.dismiss(option);
  }

  ngOnInit() {}

}
