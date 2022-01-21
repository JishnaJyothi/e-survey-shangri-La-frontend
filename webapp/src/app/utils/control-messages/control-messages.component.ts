import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ObservablesService } from '../../services/observables/observables.service'
import { ValidationService } from '../../services/validation.service'

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.css'],
})
export class ControlMessagesComponent implements OnInit {
  @Input() public control: FormControl
  public invalidformtrue = false
  constructor(private observables: ObservablesService) {}

  // tslint:disable-next-line:typedef
  public ngOnInit() {
    this.observables.validForm.subscribe((formValid) => {
      this.invalidformtrue = formValid
    })
  }

  // tslint:disable-next-line:typedef
  get errorMessage() {
    if (this.control && this.control.errors) {
      for (const propertyName in this.control.errors) {
        if (this.invalidformtrue && this.control.errors.hasOwnProperty(propertyName) && !this.control.touched) {
          return ValidationService.getValidatorErrorMessage(propertyName)
        } else if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          return ValidationService.getValidatorErrorMessage(propertyName)
        }
      }
    }
    return null;
  }
}
