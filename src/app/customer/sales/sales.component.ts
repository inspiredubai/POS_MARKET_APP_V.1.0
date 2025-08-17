import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToastService } from 'src/app/service/toast.service';
import { VansalesService } from 'src/app/service/vansales.service';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ExportFormatType, ReportFilterModel } from 'src/app/models/ReportFilterModel';

// Assign the font files to pdfMake
pdfMake.vfs = (pdfFonts as any).vfs;
import * as XLSX from 'xlsx';
import { CrystalReportService } from 'src/app/service/crystal-report.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [VansalesService, CrystalReportService],
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
  VATEXLUDE: boolean = false;       // ✅ Declare
  vatvalue: number = 0;             // ✅ Declare
  pdfSource: string | undefined;
  customersList: any;
  customer: any;
  constructor(private fb: FormBuilder,
    private vansales: VansalesService,
    private toastService: ToastService,
    private report: CrystalReportService,
    private router: Router,
    private route:ActivatedRoute,
  ) {

  this.route.queryParams.subscribe(params => {
    if (params['customer']) {
    this. customer= JSON.parse(params['customer']);
    
      console.log("Received customer:", this.customer);
    }
  });
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
      quantity: ['', Validators.required],
      vatPercent: [0],
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

      if (tenderedAmount > 0 && discountPercent > 0) {
        discountAmount = tenderedAmount * (discountPercent / 100);
      }

      total = tenderedAmount - discountAmount;

      vat = total * vatRate;

      vatExcl = total - vat;

      balance = total - cardReceived;

      // Patch the calculated fields
      this.salesForm.patchValue({
        summaryDiscountAmount: discountAmount.toFixed(2),
        summaryTotal: total.toFixed(2),
        vat: vat.toFixed(2),
        vatExcl: vatExcl.toFixed(2),
        balance: balance.toFixed(2)
      }, { emitEvent: false });

      this.isUpdating = false;
    });

    this.generalSetting();
  }
  generalSetting() {
    this.vansales.GetProgramSettingsDropdown().subscribe((m: any) => {
      const vatcal = m.resultSet.generalSettings[2]?.generalSettingsBoolValue;
      this.salesForm
        .get('vatPercent')
        .setValue(vatcal == true ? 0 : 5);
    });

  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.salesForm.controls;
  }
  addItem() {
    if (!this.tableData || this.tableData.length === 0) {
      this.salesForm.markAllAsTouched();
      this.toastService.show('Grid Value Required', 'danger');
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
    this.salesDetails = this.tableData;
    const payload = {
      salesId: 0,
      mode: this.salesForm.value.mode,
      product: this.salesForm.value.product?.displayName ? this.salesForm.value.product?.displayName : '',
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
      customerId:this.customer.customerMasterCustomerNo,
      customerName:this.customer.customerMasterCustomerName,
      details: this.salesDetails.map((detail: any, index: any) => ({
        detailId: 0,
        salesId: 0,
        sI_No: index + 1,
        item_Id:detail.item_Id,
        item_name: detail.item_name,
        qty: detail.qty,
        rate: detail.rate,
        amount: detail.amount,
        createdDate: new Date().toISOString()
      }))
    };

    this.vansales.save(payload).subscribe({
      next: (res: any) => {
        this.toastService.show('Data saved successfully', 'success');
        this.loading = false;
        if (res.printInvoice) {
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
        item_Id: this.salesForm.value.product.itemId,
        rate: this.salesForm.value.mrp,
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
      pageSize: { width: 220, height: 'auto' }, // ~80mm roll
      pageMargins: [10, 10, 10, 10],
      content: [
        {
          text: 'Van Sale',
          alignment: 'center',
          bold: true,
          fontSize: 18,
          margin: [0, 0, 0, 10]
        },

        // { text: '\n' },
        { text: `Mode: ${data.mode || ''}`, bold: true, alignment: 'center', fontSize: 11, margin: [0, 0, 0, 5] },

        { text: '........................................', alignment: 'center' },
        {
          fontSize: 9,
          table: {
            widths: ['auto', '*', 'auto', 'auto', 'auto'], // now 5 columns
            body: [
              [
                { text: '#', bold: true },
                { text: 'Item', bold: true },
                { text: 'Rate', bold: true, alignment: 'right' },
                { text: 'Qty', bold: true, alignment: 'right' },
                { text: 'Amount', bold: true, alignment: 'right' }
              ],
              ...(data.details || []).map((d: any, i: number) => [
                `${i + 1}.`,
                d.item_Name || '',
                { text: (d.rate || 0).toFixed(2), alignment: 'right' },
                { text: d.qty?.toString() || '0', alignment: 'right' },
                { text: (d.amount || 0).toFixed(2), alignment: 'right' }
              ])
            ]
          },
          layout: 'noBorders'
        },

        { text: '........................................', alignment: 'center' },


        {
          columns: [
            { width: '*', text: '' }, // empty column to push content right
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
              fontSize: 9,
              margin: [0, 5, 0, 5],
              layout: 'noBorders'
            }
          ]
        },
        // { text: `Remark: ${data.remark || ''}` },
        { text: `\nTOTAL ITEMS: ${(data.details || []).length}`, bold: true, fontSize: 10, alignment: 'center' },

        { text: '\nThank you for your purchase!', alignment: 'center', italics: true, fontSize: 12 },

        { text: '........................................', alignment: 'center', margin: [0, 5, 0, 5] },

        { text: new Date(data.createdDate).toLocaleString(), alignment: 'center', fontSize: 8 }
      ]
    };

    pdfMake.createPdf(docDefinition).download(`Order_${data.salesId}.pdf`);
  }

  // for crustal report


  rptFilter: ReportFilterModel | undefined;
  crystalReport(type: any) {
    this.rptFilter = {
      ReportName: 'SalesVoucherVAT',
      SelectionFormula: '',
      Parameters: [],
      Queries: [
        `select * from vw_salesinvoice where salesvoucherid='${452}'`,
      ],
      SP_Queries: [],
      ExportType: type === 'pdf' ? ExportFormatType.PortableDocFormat : ExportFormatType.ExcelWorkbook,

    };

    this.report.getReportPrint(this.rptFilter, true)
      .subscribe((response: any) => {
        if (type === 'pdf') {
          const blob = new Blob([response], { type: 'application/pdf' });
          this.pdfSource = URL.createObjectURL(blob);
          window.open(this.pdfSource);

        } else {
          const excelBlob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          const reader = new FileReader();

          reader.onload = (e: ProgressEvent<FileReader>) => {
            const data = new Uint8Array(e.target!.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const htmlContent = XLSX.utils.sheet_to_html(worksheet);

            const fileUrl = URL.createObjectURL(excelBlob);
            const filename = `${this.rptFilter?.ReportName}.xlsx`;

            const previewWindow = window.open('', '_blank');
            if (previewWindow) {
              previewWindow.document.write(`
                      <html>
                        <head>
                          <title>Excel Preview - ${filename}</title>
                          <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            button {
                              padding: 10px 20px;
                              margin-bottom: 20px;
                              background-color: #007bff;
                              color: white;
                              border: none;
                              border-radius: 4px;
                              cursor: pointer;
                            }
                            button:hover {
                              background-color: #0056b3;
                            }
                            table { border-collapse: collapse; width: 100%; }
                            td, th { border: 1px solid #ccc; padding: 8px; }
                          </style>
                        </head>
                        <body>
                          <button onclick="downloadExcel()">Download Excel</button>
                          ${htmlContent}
                          <script>
                            function downloadExcel() {
                              const link = document.createElement('a');
                              link.href = '${fileUrl}';
                              link.download = '${filename}';
                              link.click();
                            }
                          </script>
                        </body>
                      </html>
                    `);
              previewWindow.document.close();
            } else {
              console.error('Failed to open preview window (popup blocker?)');
            }
          };

          reader.readAsArrayBuffer(excelBlob);
        }
      });
  }

}




