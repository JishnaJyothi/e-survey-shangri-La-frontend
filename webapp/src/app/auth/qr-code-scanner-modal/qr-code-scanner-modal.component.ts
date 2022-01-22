import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import BarcodeFormat from './../../utils/barcode-format';
import { ZXingScannerComponent } from 'angular-weblineindia-qrcode-scanner';
// Alerts
import { AlertBox } from './../../utils/alert-box';

@Component({
  selector: 'app-qr-code-scanner-modal',
  templateUrl: './qr-code-scanner-modal.component.html',
  styleUrls: ['./qr-code-scanner-modal.component.css']
})
export class QrCodeScannerModalComponent implements OnInit {
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;
  // allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  allowedFormats = BarcodeFormat;
  scannerEnabled: boolean;

  constructor(
    private alert: AlertBox,
    public dialogRef: MatDialogRef<QrCodeScannerModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
  }

  public camerasFoundHandler(event): void{
    // console.log(event);
    this.alert.info('Camera found!', 'Please Scan your QR Code');
    this.scannerEnabled = true;
  }
  // public camerasNotFoundHandler(event): void{
  //   // console.log(event);
  //   this.alert.warning('Error!', 'No camera found. Please try again ');
  //   this.scannerEnabled = false;
  //   this.dialogRef.close({ event: 'cancel' });
  // }
  public scanSuccessHandler(event): void{
    // success and value
    this.alert.success('Success!', 'QR Code scanning Success');
    this.scannerEnabled = false;
    this.dialogRef.close({ event: 'success', value: event });
  }
  // public scanErrorHandler(event): void{
  //   // console.log(event);
  //   this.alert.error('Error!', 'Error occurred. Please try again ');
  //   this.scannerEnabled = false;
  //   this.dialogRef.close({ event: 'cancel' });
  // }
  // public scanFailureHandler(event): void{
  //   this.alert.error('Error!', 'QR code scanning failed, Try again');
  //   this.scannerEnabled = false;
  //   this.dialogRef.close({ event: 'cancel' });
  // }
  // public scanCompleteHandler(event): void{
  //   // console.log(event);
  //   this.alert.success('Please Wait!', 'Scanning completed');
  //   this.scannerEnabled = false;
  // }
}
