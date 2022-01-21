// Validation Service
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private abstract: AbstractControl) {}
  public null = [];
  // tslint:disable-next-line:typedef
  public static getValidatorErrorMessage(code: string) {
    const config = {
      required: 'Required',
      invalidEmailAddress: 'Invalid email address',
      invalidUsername: 'Invalid username',
      invalidAlphaNumeric: 'Invalid SNI number, SNI number must be 8 digits and contain only Uppercase alphabets and numbers only',
      invalidDate: 'Invalid Date format',
      invalidPassword: 'Invalid password. Password must be at least 8 characters long, that includes a number and an alphabet.',
      invalidCreditCard: 'Invalid credit card. Please enter valid card number.',
      invalidText: 'Invalid input. Please enter valid characters.',
      invalidNumber: 'Invalid input. Please enter valid number.',
      invalidExpiry: 'Invalid input. Please enter a valid expiry date in YYY/MM format.',
      invalidPhone: 'Invalid phone number',
      invalidUrl: 'Invalid url',
      invalidTextWithCaps: 'First letter must be uppercase',
      invalidCode: 'Must be uppercase and cannot exceed length 2',
      invalidMinSelect: 'Minimum one among the checkboxes should be selected',
      invalidPasswordMatch: 'Passwords do not match, Please enter the same password',
    };
    // console.log(config[code]);

    return config[code];
  }

  public static emailValidator(control: AbstractControl) {
    // RFC 2822 compliant regex
    // tslint:disable-next-line
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  public static passwordValidator(control: AbstractControl) {
    // {8,100}           - Assert password is between 8 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    // (?!.*\s)          - Spaces are not allowed
    // tslint:disable-next-line
    if (control.value.match(/^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{8,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  public static phoneValidator(control: AbstractControl) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    // (?!.*\s)          - Spaces are not allowed
    // tslint:disable-next-line
    if (control.value.match(/^(\+?(\d{1}|\d{2}|\d{3})[- ]?)?\d{3}[- ]?\d{3}[- ]?\d{4}$/)) {
      return null;
    } else {
      return { invalidPhone: true };
    }
  }

  public static creditCardValidator(control: AbstractControl) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    // tslint:disable-next-line
    if (
      control.value.match(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      )
    ) {
      return null;
    } else {
      return { invalidCreditCard: true };
    }
  }

  public static textOnlyValidator(control: AbstractControl) {
    // A-Z, a-z - Text only validation
    // tslint:disable-next-line
    if (control.value.match(/^(?:[ A-Za-z]*)$/)) {
      return null;
    } else {
      return { invalidText: true };
    }
  }
  public static urlValidator(control: AbstractControl) {
    // A-Z, a-z - Text only validation
    // tslint:disable-next-line
    if (control.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
      return null;
    } else {
      return { invalidUrl: true };
    }
  }
  public static textValidator(control: AbstractControl) {
    // A-Z, a-z - Text only validation
    // tslint:disable-next-line
    if (control.value.match(/^(?:[ A-Za-z!#$%&'*+/=?^_`{|}~-]*)$/)) {
      return null;
    } else {
      return { invalidText: true };
    }
  }

  public static usernameValidator(control: AbstractControl) {
    // A-Z, a-z - Text only validation
    // tslint:disable-next-line
    if (control.value.match(/^(?:[ A-Za-z0-9_]*)$/)) {
      return null;
    } else {
      return { invalidUsername: true };
    }
  }

  public static alphaNumericValidator(control: AbstractControl) {
    // A-Z, a-z - Text only validation
    // tslint:disable-next-line
    if (control.value.match(/^(?:[ A-Z0-9_]*)$/)) {
      return null;
    } else {
      return { invalidAlphaNumeric: true };
    }
  }

  //validation for date yyyy-dd-mm
  public static dateValidator(control: AbstractControl) {
    // A-Z, a-z - Text only validation
    // tslint:disable-next-line
    if (control.value.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)) {
      return null;
    } else {
      return { invalidDate: true };
    }
  }

  public static numberOnlyValidator(control: AbstractControl) {
    // 0-9 - Number only validation
    // tslint:disable-next-line
    if (control.value.match(/^(?:[0-9]*)$/)) {
      return null;
    } else {
      return { invalidNumber: true };
    }
  }

  public static expiryDateValidationMMYYYY(control: AbstractControl) {
    // MM-YYYY Validator
    // tslint:disable-next-line
    if (control.value.match(/^(?:((2009)|(20[1-2][0-9]))\/((0[1-9])|(1[0-2])))$/)) {
      return null;
    } else {
      return { invalidExpiry: true };
    }
  }

  public static firstOnlyCapsValidator(control: AbstractControl) {
    // A-Z, a-z= - Text only validation with first letter only caps
    // tslint:disable-next-line
    if (control.value.match(/^[A-Z][ A-Za-z]*$/)) {
      return null;
    } else {
      return { invalidTextWithCaps: true };
    }
  }

  public static CapsOnlyValidator(control: AbstractControl) {
    // A-Z, a-z= - Text only validation with first letter only caps
    // tslint:disable-next-line
    if (control.value.match(/^([A-Z]{2})$/)) {
      return null;
    } else {
      return { invalidCode: true };
    }
  }

  public static minSelectedCheckboxes(control: any) {
    /**
     * Function for minimum selection checkbox
     * @functionCall - minSelectedCheckboxes()
     * @return - validation message
     */

    let checked = 0;
    control.controls.forEach((key) => {
      const controlValue = key.value;
      if (controlValue === true) {
        checked++;
      } else {
        const v = 0;
      }
    });
    if (checked < 1) {
      return {
        invalidMinSelect: true,
      };
    }
    return null;
  }

  public static checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { invalidPasswordMatch: true };
  }
}
