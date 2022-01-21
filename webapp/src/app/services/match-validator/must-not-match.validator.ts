/**
 * check not-match validation for two strings
 * @params controlName, nonmatchingControlName
 * @return setErrors -null(if-not-match), setErrors -error(if-match)
 * @author Jishna AV
 */

import { FormGroup } from '@angular/forms'

// custom validator to check that two fields does-not-match
export function MustNotMatch(controlName: string, nonmatchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName]
    const nonmatchingControl = formGroup.controls[nonmatchingControlName]

    if (nonmatchingControl.errors && !nonmatchingControl.errors.mustnotMatch) {
      // return if another validator has already found an error on the nonmatchingControl
      return
    }

    // set error on nonmatchingControl if validation fails
    if (control.value === nonmatchingControl.value) {
      nonmatchingControl.setErrors({ mustnotMatch: true })
    } else {
      nonmatchingControl.setErrors(null)
    }
  }
}
