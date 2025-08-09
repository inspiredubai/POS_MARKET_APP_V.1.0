import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VansalesService } from 'src/app/service/vansales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
      standalone: true,
   imports: [CommonModule, IonicModule, FormsModule,HttpClientModule,ReactiveFormsModule],
   providers: [VansalesService ], 
})
export class SalesComponent implements OnInit {
  salesForm: any;
    products: any[] = [];
  allItems: any;
  tableData: any[] = [];
   constructor(private fb: FormBuilder,private vansales: VansalesService) {


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
    this.getItems()
    
  }
  
 get f(): { [key: string]: AbstractControl } {
  return this.salesForm.controls;
}
    addItem() {
    if (this.salesForm.invalid) {
      this.salesForm.markAllAsTouched();
      return;
    }
    console.log("form value",this.salesForm.value)
  }
   openItem() {
    // this.getItems();
  }
getItems()  {
     this.vansales.getItems().subscribe((response: any) => {
      
      if (response.result) {

        this.allItems = response.result?.map((data:any) => ({
          label: data.itemMasterItemName,
          value: data.itemMasterItemId,
          
        }))
        this.allItems.unshift({ label: '--Select--', value: -1 });
      }

    })
    
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
  
  // getItems() {
  //   this.vansales.getItems().subscribe({
  //     next: (res: any) => {
  //       console.log('res', res);
  //       this.products = res;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching items', err);
  //     }
  //   });
  // }

  // getItems(){
  //   this.vansales.getItems().subscribe((res) => {
  //     console.log('res', res)
  //   })
  // }
}
