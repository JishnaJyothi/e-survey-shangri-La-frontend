import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
// Services
import { MustMatch } from './../../services/match-validator/must-match.validator';
import { ApiService } from './../../services/api.service';
import { ObservablesService } from './../../services/observables/observables.service';
import { ValidationService } from './../../services/validation.service';
// Alerts
import { AlertBox } from './../../utils/alert-box';
import { QrCodeScannerModalComponent } from '../qr-code-scanner-modal/qr-code-scanner-modal.component';
import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public passwordView = false;
  public confirmPasswordView = false;
  public qrCodeSNI = '';
  public sniUnique = false;
  public sniUniqueShow = false;
  public emailUnique = false;
  public emailUniqueShow = false;


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private alert: AlertBox,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private observables: ObservablesService,
  ) { }

  ngOnInit(): void {
    this.observables.changeFormValid(false);
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, ValidationService.textOnlyValidator]],
      lastName: ['', [Validators.required, ValidationService.textOnlyValidator]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      dob: ['', [Validators.required, ValidationService.dateValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      confirmPassword: ['', [Validators.required, ValidationService.passwordValidator]],
      address: ['', [Validators.required]],
      sniNumber: ['', [Validators.required, ValidationService.alphaNumericValidator]],
    },
    {
      validator: [MustMatch('password', 'confirmPassword')],
    }
    );
  }

  //  Switching method
  public viewPassword(passwordId: any): void{
    if ((document.getElementById(passwordId) as HTMLInputElement).type === 'password') {
      (document.getElementById(passwordId) as HTMLInputElement).type = 'text';
      if (passwordId === 'password') { this.passwordView = true; }
      else { this.confirmPasswordView = true; }
    } else {
      (document.getElementById(passwordId) as HTMLInputElement).type = 'password';
      if (passwordId === 'password') { this.passwordView = false; }
      else { this.confirmPasswordView = false; }
    }
  }

  // call unique check functions on focusout
  public doCheckUniqueOnFocusOut(event: any): void{
    if (event.target.id === 'sniNumber') { this.doCheckUniqueSNI(event.target.value); }
    else if (event.target.id === 'email') { this.doCheckUniqueEmail(event.target.value); }
  }

  // check email uniqueness
  public doCheckUniqueEmail(value: any): void{
    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/.test(value)){
    this.emailUnique = true;
    this.emailUniqueShow = true;
    } else{
    this.alert.warning('Invalid!', 'Entered email address is not valid, Please try again');
    this.sniUnique = false;
    this.sniUniqueShow = true;
    }
 }

  // check SNI uniqueness
  public doCheckUniqueSNI(value: any): void{
   if (/^(?:[ A-Z0-9_]*)$/.test(value)){
    this.sniUnique = true;
    this.sniUniqueShow = true;
   } else{
    this.alert.warning('Invalid!', 'Entered SNI number is not valid, Please try again');
    this.sniUnique = false;
    this.sniUniqueShow = true;
  }
}

// open modal to scan QR code
 public openQRCodeScanner(): void {
  const dialogRef = this.dialog.open(QrCodeScannerModalComponent, {
    data: {
      width: '10rem',
      height: '10rem',
    },
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result.event === 'success'){
      this.registerForm.patchValue({ sniNumber: result.value });
      this.doCheckUniqueSNI(result.value);
    }
  });
 }

 // function to register
 public doRegister(): void {
  if (this.registerForm.invalid) {
    this.observables.changeFormValid(true);
    return;
  } else if (!this.sniUnique && !this.emailUnique) {
    this.doCheckUniqueEmail(this.registerForm.value.sniNumber);
    this.doCheckUniqueSNI(this.registerForm.value.email);
    this.observables.changeFormValid(true);
    return;
  } else {
    (document.querySelector('.register') as HTMLInputElement).setAttribute('disabled', '');
  }

  const url = 'users/register';
  const name = this.registerForm.value.firstName + ' ' + this.registerForm.value.lastName;
  const data: any = {
    username: name,
    email: this.registerForm.value.email,
    password: this.registerForm.value.password,
    dob: this.registerForm.value.dob,
    address: this.registerForm.value.address,
    SNI: this.registerForm.value.sniNumber,
  };

  this.apiService.doPostRequest(url, data).subscribe(
    (returndata: any) => {
      if (returndata.status === 'success'){
        this.router.navigate(['/login']);
        this.alert.success('Congratulations!', 'Your registration processes is completed, Login to have a look');
      }
    },
    (error) => {
      (document.querySelector('.register') as HTMLInputElement).removeAttribute('disabled');
      if (error.error.message) {
        this.alert.error('Error!', error.error.message);
      } else {
      this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
      }
    }
  );
}

}
