import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToastService } from 'src/app/service/toast.service';
import { VansalesService } from 'src/app/service/vansales.service';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// Assign the font files to pdfMake
pdfMake.vfs = (pdfFonts as any).vfs;


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
  MrpValue: any;
  sales: any
     isUpdating = false;
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



  this.getItems();

  this.salesForm.valueChanges.subscribe((values: { mrp: string; cutOffRate: string; discountPercent: string; quantity: string; vatPercent: string; }) => {
    const mrp = parseFloat(values.mrp) || 0;
    const cutOffRate = parseFloat(values.cutOffRate) || 0;
    const discountPercent = parseFloat(values.discountPercent) || 0;
    const quantity = parseFloat(values.quantity) || 0;
    const vatPercent = parseFloat(values.vatPercent) || 0;

    const discountAmount = mrp * (discountPercent / 100);

    let unitInclV = mrp - discountAmount;
    if (cutOffRate > 0) {
      unitInclV = cutOffRate;
    }

    const unitExclV = unitInclV / (1 + vatPercent / 100);

    const total = unitInclV * quantity;

    this.salesForm.patchValue({
      discountAmount: discountAmount.toFixed(2),
      unitInclV: unitInclV.toFixed(2),
      unitExclV: unitExclV.toFixed(2),
      total: total.toFixed(2)
    }, { emitEvent: false });
  });

     const vatRate = 0.05;

    this.salesForm.valueChanges.subscribe((values: { tenderedAmount: string; summaryDiscountPercent: string; cardReceived: string; }) => {
      if (this.isUpdating) return;
      this.isUpdating = true;

      const tenderedAmount = parseFloat(values.tenderedAmount) || 0;
      const discountPercent = parseFloat(values.summaryDiscountPercent) || 0;
      const cardReceived = parseFloat(values.cardReceived) || 0;

      let discountAmount = 0;
      let total = tenderedAmount;
      let vat = 0;
      let vatExcl = 0;
      let balance = 0;

      // STEP 1: Calculate discount amount
      if (tenderedAmount > 0 && discountPercent > 0) {
        discountAmount = tenderedAmount * (discountPercent / 100);
      }

      // STEP 2: Apply discount to total
      total = tenderedAmount - discountAmount;

      // STEP 3: Calculate VAT (5%)
      vat = total * vatRate;

      // STEP 4: VAT Exclusive (Total - VAT)
      vatExcl = total - vat;

      // STEP 5: Calculate balance after card payment
      balance = total - cardReceived;

      // Patch the calculated fields
      this.salesForm.patchValue({
        discountAmount: discountAmount.toFixed(2),
        summaryTotal: total.toFixed(2),
        vat: vat.toFixed(2),
        vatExcl: vatExcl.toFixed(2),
        balance: balance.toFixed(2)
      }, { emitEvent: false });

      this.isUpdating = false;
    });
  

 }


  get f(): { [key: string]: AbstractControl } {
    return this.salesForm.controls;
  }
  // addItem() {
  //   if (this.salesForm.invalid) {
  //     this.salesForm.markAllAsTouched();
  //     return;
  //   } else {
  //     this.save()
  //   }
  // }
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
     this.salesDetails=this.tableData;
    const payload = {
      salesId: 0,
      mode: this.salesForm.value.mode,
      product: this.salesForm.value.product?.displayName?this.salesForm.value.product?.displayName:'',
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
        item_name: detail.item_name,
        qty: detail.qty,
        amount: detail.amount,
        createdDate: new Date().toISOString()
      }))
    };
   
    this.vansales.save(payload).subscribe({
      next: (res:any) => {
        console.log("Saved successfully", res);
        this.toastService.show('Data saved successfully', 'success');
        this.loading = false;
        debugger
        if(res.printInvoice){
        this.downloadPDF(res)
        }
      },
      error: (err) => {
        console.error("Error saving", err);
        this.toastService.show('Something wentrong', 'danger');
        this.loading = false;
      }
    });
  }
  // Example: Calculate sum of 'amount' from tableData
getTotalAmount() {
  debugger
  if (!this.tableData || this.tableData.length === 0) {
    this.salesForm.patchValue({
      tenderedAmount: 0,
      summaryTotal: 0
    }, { emitEvent: false });
    return 0;
  }

  const totalAmount = this.tableData.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0
  );

  // Update form values without triggering valueChanges again
  this.salesForm.patchValue({
    tenderedAmount: totalAmount,
    summaryTotal: totalAmount
  }, { emitEvent: false });

  return totalAmount;
}


  onAdd() {
    if (this.salesForm.valid) {
      const newRow = {
        si_no: this.tableData.length + 1,
        item_name: this.salesForm.value.product.displayName,
        qty: this.salesForm.value.quantity,
        amount: this.salesForm.value.total
      };

      this.tableData.push(newRow);
      const tenderedAmountValue = this.salesForm.get('tenderedAmount')?.value;
      const summaryTotalValue = this.salesForm.get('summaryTotal')?.value;

      this.salesForm.reset();

    this.salesForm.patchValue({
  tenderedAmount: tenderedAmountValue,
  summaryTotal: summaryTotalValue
});

      this.getTotalAmount()
     // this.salesForm.reset();
    } else {
      Object.values(this.f).forEach(control => {
        control.markAsTouched();
      });
      this.toastService.show('Fill Required', 'danger');
    }
  }

  onProductChange(event: any) {
    const selectedProduct = event.detail.value;
    if (selectedProduct) {
      this.salesForm.get('mrp')?.setValue(selectedProduct.rate);
      this.salesForm.get('barcode')?.setValue(selectedProduct.barcode);
    }
  }


downloadPDF(data: any) {
  const subtotal = data.details?.reduce((sum: number, d: any) => sum + (d.amount || 0), 0) || 0;
  const total = subtotal;
  const vatExcl = data.vatExcl || 0;
  const tenderedAmount = data.tenderedAmount || 0;
  const cardReceived = data.cardReceived || 0;

  const docDefinition: any = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    content: [
      // HEADER
      {
        columns: [
          { text: 'VAN SALE', style: 'invoiceTitle' },
          {
            stack: [
              { text: `Invoice #${data.salesId}`, style: 'invoiceNumber' },
              { text: `Date: ${new Date(data.createdDate).toLocaleDateString()}`, style: 'invoiceDate' }
            ],
            alignment: 'right'
          }
        ]
      },
      { text: '\n' },

      // ORDER INFO ONLY
      {
        columns: [
          {
            width: '100%',
            stack: [
              { text: `Mode: ${data.mode || ''}`, bold: true },
              { text: `Remark: ${data.remark || ''}` }
            ]
          }
        ]
      },
      { text: '\n' },

      // ITEMS TABLE
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto'],
          body: [
            [
              { text: '#', style: 'tableHeader' },
              { text: 'Item Name', style: 'tableHeader' },
              { text: 'Qty', style: 'tableHeader', alignment: 'right' },
              { text: 'Amount', style: 'tableHeader', alignment: 'right' }
            ],
            ...(data.details || []).map((d: any) => [
              d.sI_No || '',
              d.item_Name || '',
              { text: d.qty || 0, alignment: 'right' },
              { text: (d.amount || 0).toFixed(2), alignment: 'right' }
            ])
          ]
        },
        layout: {
          fillColor: (rowIndex: number) => rowIndex === 0 ? '#eeeeee' : null,
          hLineColor: () => '#cccccc',
          vLineColor: () => '#cccccc'
        }
      },
      { text: '\n' },

      // TOTALS
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            table: {
              widths: ['*', 'auto'],
              body: [
                ['Subtotal', subtotal.toFixed(2)],
                ['VAT Excl', vatExcl.toFixed(2)],
                ['Tendered Amount', tenderedAmount.toFixed(2)],
                ['Card Received', cardReceived.toFixed(2)],
                [{ text: 'Total', bold: true }, { text: total.toFixed(2), bold: true }]
              ]
            },
            layout: 'lightHorizontalLines'
          }
        ]
      },

      { text: '\nThank you for your purchase!', alignment: 'center', italics: true, fontSize: 12 }
    ],

    styles: {
      invoiceTitle: { fontSize: 20, bold: true },
      invoiceNumber: { fontSize: 12, bold: true },
      invoiceDate: { fontSize: 10, italics: true },
      tableHeader: { bold: true, fontSize: 12, color: 'black' }
    }
  };

  pdfMake.createPdf(docDefinition).download(`Invoice_${data.salesId}.pdf`);
}


}



