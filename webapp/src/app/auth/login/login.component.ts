import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { ApiService } from './../../services/api.service';
import { ObservablesService } from './../../services/observables/observables.service';
import { ValidationService } from './../../services/validation.service';
// Alerts
import { AlertBox } from './../../utils/alert-box';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public passwordView = false;

  constructor(
    private router: Router,
    private alert: AlertBox,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private observables: ObservablesService,
  ) { }

  ngOnInit(): void {
    this.observables.changeFormValid(false);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
    });
  }

  //  Switching method
  public viewPassword() {
    if ((document.getElementById('password') as HTMLInputElement).type === 'password') {
      (document.getElementById('password') as HTMLInputElement).type = 'text';
    } else {
      (document.getElementById('password') as HTMLInputElement).type = 'password';
    }
  }

  public doLogin() {
    if (this.loginForm.invalid) {
      this.observables.changeFormValid(true);
      return;
    } else {
      (document.querySelector('.login') as HTMLInputElement).setAttribute('disabled', '');
    }

    const url = '';
    const data: any = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.apiService.doLogin(data)
    .subscribe(
      (returndata: any) => {
      }, error => {
        console.log(error);
        this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
      }
    );

  }

}
