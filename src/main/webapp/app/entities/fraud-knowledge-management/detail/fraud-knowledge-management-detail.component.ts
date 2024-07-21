import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFraudKnowledgeManagement } from '../fraud-knowledge-management.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'jhi-fraud-knowledge-management-detail',
  templateUrl: './fraud-knowledge-management-detail.component.html',
})
export class FraudKnowledgeManagementDetailComponent implements OnInit {
  fraudKnowledgeManagement: IFraudKnowledgeManagement | null = null;
  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef<any>;

  constructor(protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fraudKnowledgeManagement }) => {
      this.fraudKnowledgeManagement = fraudKnowledgeManagement;
    });
  }
  // ngAfterViewInit() {
  //   this.generatePdf();
  // }
  previousState(): void {
    window.history.back();
  }

  generatePdf(): void {
    const dlElement = this.reportContent.nativeElement.querySelector('dl');
    const dtElements = Array.from(dlElement.querySelectorAll('dt') as NodeListOf<HTMLElement>);
    const ddElements = Array.from(dlElement.querySelectorAll('dd') as NodeListOf<HTMLElement>);
  
    const documentDefinition = {
      content: [
        { text: 'Fraud Knowledge Management', style: 'header' },
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
      if (dtElement instanceof HTMLElement && ddElements[index] instanceof HTMLElement) {
        const dtText = dtElement.innerText;
        const ddText = ddElements[index].innerText;
  
        documentDefinition.content.push(
          { text: dtText, style: 'dt' },
          { text: ddText, style: 'dd' }
        );
      }
    });
  
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition as any).download('fraud-knowledge-management.pdf');
  }
  
}
