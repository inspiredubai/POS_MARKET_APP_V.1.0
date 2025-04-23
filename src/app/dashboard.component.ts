import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {


  selectedBranch: string;
  branches: string[] = ['Ajman', 'Dubai', 'Sharjah'];
  user: any;

  constructor() {
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

  closeShift() {
    console.log('Shift closed');
    // Add your logic to handle the shift closure
  }


  ngOnInit() {}

}
