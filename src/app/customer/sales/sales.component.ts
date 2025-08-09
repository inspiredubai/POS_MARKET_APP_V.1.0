import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToastService } from 'src/app/service/toast.service';
import { VansalesService } from 'src/app/service/vansales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [VansalesService],
})
export class SalesComponent implements OnInit {
  salesForm: any;
  products: any[] = [];
  allItems: any;
  salesDetails: any;
  tableData: any[] = [];
  loading = false;
  constructor(private fb: FormBuilder,
    private vansales: VansalesService,
    private toastService: ToastService
  ) {


  }

  ngOnInit() {
  this.salesForm = this.fb.group({
    mode: ['retail'],
    product: ['', Validators.required],
    barcode: [''],
    mrp: ['', Validators.required],
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

  this.salesDetails = [
    { detailId: 0, salesId: 0, sI_No: 1, item_Name: 'Coca Cola 1.5L', qty: 2, amount: 500, createdDate: new Date().toISOString() },
    { detailId: 0, salesId: 0, sI_No: 2, item_Name: 'Pepsi 1.5L', qty: 3, amount: 750, createdDate: new Date().toISOString() }
  ];

  this.getItems();

  // ===== Auto calculation logic =====
  this.salesForm.get('discountPercent')?.valueChanges.subscribe((val: number | string) => {
    if (val !== null && val !== undefined && val !== '') {
      const mrp = +this.salesForm.get('mrp')?.value || 0;
      const percent = Number(val) || 0;
      const discountAmount = (mrp * percent) / 100;
      this.salesForm.patchValue({
        discountAmount: discountAmount,
        total: mrp - discountAmount
      }, { emitEvent: false });
    }
  });

  this.salesForm.get('discountAmount')?.valueChanges.subscribe((val: number | string) => {
    if (val !== null && val !== undefined && val !== '') {
      const mrp = +this.salesForm.get('mrp')?.value || 0;
      const amount = Number(val) || 0;
      const percent = mrp ? (amount / mrp) * 100 : 0;
      this.salesForm.patchValue({
        discountPercent: percent,
        total: mrp - amount
      }, { emitEvent: false });
    }
  });

  this.salesForm.get('quantity')?.valueChanges.subscribe((qty: number | string) => {
    if (qty !== null && qty !== undefined && qty !== '') {
      const mrp = +this.salesForm.get('mrp')?.value || 0;
      const quantity = Number(qty) || 0;
      const total = mrp * quantity;
      this.salesForm.patchValue({
        total: total
      }, { emitEvent: false });
    }
  });
}


  get f(): { [key: string]: AbstractControl } {
    return this.salesForm.controls;
  }
  addItem() {
    if (this.salesForm.invalid) {
      this.salesForm.markAllAsTouched();
      return;
    } else {
      this.save()
    }
  }
  openItem() {
    // this.getItems();
  }

  getItems() {
    this.vansales.getItems().subscribe((response: any) => {

      if (response.result) {

        // this.allItems = response.result?.map((data:any) => ({
        //   label: data.displayName,
        //   value: data.itemId,

        // }))
        // this.allItems.unshift({ label: '--Select--', value: -1 });
        this.allItems = response.result
      }

    })
  }
  save() {
    this.loading = true;
    const payload = {
      salesId: 0,
      mode: this.salesForm.value.mode,
      product: this.salesForm.value.product.label,
      barcode: this.salesForm.value.barcode,
      mrp: this.salesForm.value.mrp,
      cutOffRate: this.salesForm.value.cutOffRate,
      discountPercent: this.salesForm.value.discountPercent,
      unitExclV: this.salesForm.value.unitExclV,
      foc: this.salesForm.value.foc,
      discountAmount: this.salesForm.value.discountAmount,
      unitInclV: this.salesForm.value.unitInclV,
      quantity: this.salesForm.value.quantity,
      vatPercent: this.salesForm.value.vatPercent,
      total: this.salesForm.value.total,
      summaryDiscountPercent: this.salesForm.value.summaryDiscountPercent,
      vatExcl: this.salesForm.value.vatExcl,
      tenderedAmount: this.salesForm.value.tenderedAmount,
      summaryDiscountAmount: this.salesForm.value.summaryDiscountAmount,
      vat: this.salesForm.value.vat,
      cardReceived: this.salesForm.value.cardReceived,
      balance: this.salesForm.value.balance,
      summaryTotal: this.salesForm.value.summaryTotal,
      addedToCredit: this.salesForm.value.addedToCredit,
      remark: this.salesForm.value.remark,
      printInvoice: this.salesForm.value.printInvoice,
      createdDate: new Date().toISOString(),
      details: this.salesDetails.map((detail: any, index: any) => ({
        detailId: 0,
        salesId: 0,
        sI_No: index + 1,
        item_Name: detail.product,
        qty: detail.qty,
        amount: detail.amount,
        createdDate: new Date().toISOString()
      }))
    };
    console.log("payload", payload)
    this.vansales.save(payload).subscribe({
      next: (res) => {
        console.log("Saved successfully", res);
        this.toastService.show('Data saved successfully', 'success');
        this.loading = false;
      },
      error: (err) => {
        console.error("Error saving", err);
        this.toastService.show('Something wentrong', 'danger');
        this.loading = false;
      }
    });
  }
  onAdd() {
    if (this.salesForm.valid) {
      const newRow = {
        si_no: this.tableData.length + 1,
        item_name: this.salesForm.value.product,
        qty: this.salesForm.value.quantity,
        amount: this.salesForm.value.total
      };

      this.tableData.push(newRow);
      this.salesForm.reset(); // Clear form after adding
    } else {
      Object.values(this.f).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onProductChange(event: any) {
    const selectedProduct = event.detail.value;
    if (selectedProduct) {
      this.salesForm.get('mrp')?.setValue(selectedProduct.rate);
      this.salesForm.get('unitInclV')?.setValue(selectedProduct.rate);


      //     this.vansales.getItemById(selectedProduct.value).subscribe({
      //   next: (res) => {
      //     console.log('Item details:', res);
      //   },
      //   error: (err) => {
      //     console.error('Error fetching item:', err);
      //   }
      // });

    }
  }

}
