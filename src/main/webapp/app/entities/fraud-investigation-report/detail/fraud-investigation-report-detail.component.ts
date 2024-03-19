import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFraudInvestigationReport } from '../fraud-investigation-report.model';
import { DataUtils } from 'app/core/util/data-util.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'jhi-fraud-investigation-report-detail',
  templateUrl: './fraud-investigation-report-detail.component.html',
})
export class FraudInvestigationReportDetailComponent implements OnInit {
  //@ViewChild('pdfTable') pdfTable!: ElementRef<any>;
  fraudInvestigationReport: IFraudInvestigationReport | null = null;

  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef<any>;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fraudInvestigationReport }) => {
      this.fraudInvestigationReport = fraudInvestigationReport;
    });
  }
  // ngAfterViewInit() {
  //   this.generatePdf();
  // }
  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }

  /*   generatePdf(): void {
      const doc = new jsPDF();
      const reportContent = this.reportContent.nativeElement;
  
      html2canvas(reportContent).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 size
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save('fraud-investigation-report.pdf');
      });
    } */

  generatePdf() {
    if (!this.reportContent) {
      return; // Return gracefully if the reportContent is undefined
    }

    const dlElement = this.reportContent.nativeElement.querySelector('dl');
    const dtElements = Array.from(dlElement.querySelectorAll('dt')) as HTMLElement[];
    const ddElements = Array.from(dlElement.querySelectorAll('dd')) as HTMLElement[];

    const documentDefinition = {
      content: [
        { text: 'Fraud Investigation Report', style: 'header' },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        dt: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        dd: {
          fontSize: 12,
          margin: [0, 0, 0, 5]
        }
      }
    };

    dtElements.forEach((dtElement, index) => {
      const dtText = dtElement.innerText;
      const ddText = ddElements[index].innerText;

      documentDefinition.content.push(
        { text: dtText, style: 'dt' },
        { text: ddText, style: 'dd' }
      );
    });

    // Set the fonts in pdfMake
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // Create the PDF using pdfMake
    pdfMake.createPdf(documentDefinition as any).download('fraud-investigation-report.pdf');
  }
}
