import { Component, OnInit } from '@angular/core';
import {InvoiceApiService} from '../../shared/service/invoice/invoice-api.service';
import {InvoiceMapperService} from '../../shared/service/invoice/invoice-mapper.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {InvoiceModel} from '../../shared/model/invoice/invoice.model';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  invoiceId: number;
  invoice: InvoiceModel;

  constructor(private route: ActivatedRoute,
              private invoiceApiService: InvoiceApiService,
              private invoiceMapperService: InvoiceMapperService) { }

  ngOnInit() {
    this.invoiceId = this.route.snapshot.queryParams['id'];
    this.loadInvoiceDetails();
  }

  loadInvoiceDetails() {
    this.invoiceApiService.getInvoiceDetailsById(this.invoiceId).pipe(
      map(response => response.data),
      map(invoiceDto => this.invoiceMapperService.mapDtoToModel(invoiceDto))
    ).subscribe(invoice => this.invoice = invoice);

  }

  generatePdf() {
    const fileName = this.invoice.invoiceNumber + '_' + this.invoice.client.name + '.pdf';
    this.invoiceApiService.generateInvoicePdf(this.invoiceId).subscribe((blob: Blob) => {

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, fileName);
      } else {
        const link = document.createElement('a');
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', fileName);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
    });

  }

}
