import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {

  salesForm: any;

  constructor(private fb: FormBuilder) {


  }

  ngOnInit() {
    this.salesForm = this.fb.group({
      mode: ['retail'],
      product: [''],
      mrp: [' ', Validators.required],
      cutOffRate: [''],
      discountPercent: [''],
      unitExclV: [''],
      foc: [''],
      discountAmount: [''],
      unitInclV: [''],
      quantity: [''],
      vatPercent: [''],
      total: [''],
      summaryDiscountPercent: [0.0],
      vatExcl: [0.0],
      tenderedAmount: [0.0],
      summaryDiscountAmount: [0.0],
      vat: [0.0],
      cardReceived: [0.0],
      balance: [0.0],
      summaryTotal: [0.0],
      addedToCredit: [0.0],
      remark: [''],
      printInvoice: [false],
    });
  }
  get f() {
    return this.salesForm.controls;
  }
}
