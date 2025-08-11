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


 this.sales = {
      salesId: 18,
      mode: "retail",
      remark: "ok",
      createdDate: "2025-08-11T03:03:10.51Z",
      summaryDiscountPercent: 5,
      vatExcl: 9,
      tenderedAmount: 7,
      cardReceived: 88,
      details: [
        { sI_No: 1, item_Name: "Item1-Pcs", qty: 8, amount: 168.00 },
        { sI_No: 2, item_Name: "testtdd fgh fghdfghdfgh 22-box", qty: 8, amount: 120.00 }
      ]
    };

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
  onAdd() {
    if (this.salesForm.valid) {
      const newRow = {
        si_no: this.tableData.length + 1,
        item_name: this.salesForm.value.product.displayName,
        qty: this.salesForm.value.quantity,
        amount: this.salesForm.value.total
      };

      this.tableData.push(newRow);
      this.salesForm.reset();
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

// downloadPDF() {
//     const docDefinition: any = {
//       content: [
//         { text: 'Sales Report', style: 'header' },
//         { text: `Sales ID: ${this.sales.salesId}`, style: 'subheader' },
//         { text: `Mode: ${this.sales.mode}` },
//         { text: `Remark: ${this.sales.remark}` },
//         { text: `Created Date: ${new Date(this.sales.createdDate).toLocaleString()}` },
//         { text: `Summary Discount %: ${this.sales.summaryDiscountPercent}%` },
//         { text: `VAT Excl: ${this.sales.vatExcl}` },
//         { text: `Tendered Amount: ${this.sales.tenderedAmount}` },
//         { text: `Card Received: ${this.sales.cardReceived}` },
//         { text: ' ', margin: [0, 10] },

//         {
//           table: {
//             headerRows: 1,
//             widths: ['auto', '*', 'auto', 'auto'],
//             body: [
//               ['#', 'Item Name', 'Qty', 'Amount'],
//               ...this.sales.details.map((d: any) => [
//                 d.sI_No,
//                 d.item_Name,
//                 d.qty,
//                 { text: d.amount.toFixed(2), alignment: 'right' }
//               ])
//             ]
//           }
//         }
//       ],
//       styles: {
//         header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
//         subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] }
//       }
//     };

//     pdfMake.createPdf(docDefinition).download(`SalesReport_${this.sales.salesId}.pdf`);
//   }
downloadPDF(data:any) {
  const docDefinition: any = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    content: [
      // HEADER
      {
        columns: [
          { text: 'My Store Name', style: 'invoiceTitle' },
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

      // CUSTOMER / ORDER INFO
      {
        columns: [
          {
            width: '50%',
            stack: [
              { text: 'Sold To:', bold: true },
              { text: 'Customer Name Here' },
              { text: '123 Street Name' },
              { text: 'City, Country' }
            ]
          },
          {
            width: '50%',
            stack: [
              { text: 'Details:', bold: true },
              { text: `Mode: ${this.sales.mode}` },
              { text: `Remark: ${this.sales.remark}` }
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
            ...data.details.map((d: any) => [
              d.sI_No,
              d.item_Name,
              { text: d.qty, alignment: 'right' },
              { text: Number(d.amount).toFixed(2), alignment: 'right' }
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
                ['Subtotal', data.details.reduce((sum: number, d: any) => sum + d.amount, 0).toFixed(2)],
                ['VAT Excl', data.vatExcl.toFixed(2)],
                ['Tendered Amount', data.tenderedAmount.toFixed(2)],
                ['Card Received', data.cardReceived.toFixed(2)],
                [{ text: 'Total', bold: true }, { text: data.details.reduce((sum: number, d: any) => sum + d.amount, 0).toFixed(2), bold: true }]
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

  pdfMake.createPdf(docDefinition).download(`Invoice_${this.sales.salesId}.pdf`);
}

}



