import { Component } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-scan-ticket',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './scan-ticket.component.html',
  styleUrl: './scan-ticket.component.scss'
})
export class ScanTicketComponent {
  fileSelected: File | null = null;
  fileName: string = '';
  loading: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';
  showDownloadButton: boolean = false;
  lastCsvBlob: Blob | null = null;

  constructor(private imageService: ImageService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileSelected = file;
      this.fileName = file.name;
      this.errorMsg = '';
      this.successMsg = '';
      this.showDownloadButton = false;
      this.lastCsvBlob = null;
    }
  }

  uploadTicket() {
    if (!this.fileSelected) return;
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.showDownloadButton = false;
    this.imageService.uploadTicket(this.fileSelected).subscribe({
      next: (blob: Blob) => {
        this.loading = false;
        this.successMsg = '¡Ticket procesado con éxito!';
        this.showDownloadButton = true;
        this.lastCsvBlob = blob;
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Error al procesar el ticket. Intenta con otra imagen.';
        this.showDownloadButton = false;
      }
    });
  }

  downloadCsv() {
    if (!this.lastCsvBlob) return;
    const url = window.URL.createObjectURL(this.lastCsvBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'libro_iva_compras_ticket.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  }
}
