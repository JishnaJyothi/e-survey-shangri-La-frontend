import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  private formValid = new BehaviorSubject<boolean>(false);

  public validForm = this.formValid.asObservable();

  constructor() { }

  // tslint:disable-next-line:typedef
  public changeFormValid(valid: any) {
    this.formValid.next(valid);
  }
  
}
