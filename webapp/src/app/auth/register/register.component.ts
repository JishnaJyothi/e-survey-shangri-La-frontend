import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { MustMatch } from './../../services/match-validator/must-match.validator';
import { ApiService } from './../../services/api.service';
import { ObservablesService } from './../../services/observables/observables.service';
import { ValidationService } from './../../services/validation.service';
// Alerts
import { AlertBox } from './../../utils/alert-box';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public passwordView = false;
  public confirmPasswordView = false;

  constructor(
    private router: Router,
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
  public viewPassword(passwordId: any) {
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

  public doCheckUniqueEmail(event: any){
    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/.test(event.target.value)){
      // true
    } else{
      this.alert.warning('Invalid!', 'Entered email address is not valid, Please try again');
    }
 }

 public doCheckUniqueSNI(event: any){
   if (/^(?:[ A-Z0-9_]*)$/.test(event.target.value)){
   } else{
    this.alert.warning('Invalid!', 'Entered SNI number is not valid, Please try again');
  }
}

    public doRegister() {
      if (this.registerForm.invalid) {
        this.observables.changeFormValid(true);
        return;
      } else {
        (document.querySelector('.register') as HTMLInputElement).setAttribute('disabled', '')
      }

      const url = '';
      const data: any = {
        firstname: this.registerForm.value.firstName,
        lastname: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        dob: this.registerForm.value.dob,
        password: this.registerForm.value.password,
        address: this.registerForm.value.address,
        sniNumber: this.registerForm.value.sniNumber,
      };

      this.apiService.doPostRequest(url, data)
      .subscribe(
        (returndata: any) => {
        }, error => {
          console.log(error);
          this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
        }
      );

    }
}
