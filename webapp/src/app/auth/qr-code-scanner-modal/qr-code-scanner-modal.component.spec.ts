import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeScannerModalComponent } from './qr-code-scanner-modal.component';

describe('QrCodeScannerModalComponent', () => {
  let component: QrCodeScannerModalComponent;
  let fixture: ComponentFixture<QrCodeScannerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCodeScannerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeScannerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
