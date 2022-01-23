import { Component, Inject, OnInit, Optional } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { MustMatch } from '../../../../services/match-validator/must-match.validator';
import { ApiService } from '../../../../services/api.service';
import { ObservablesService } from '../../../../services/observables/observables.service';
import { ValidationService } from '../../../../services/validation.service';
// Alerts
import { AlertBox } from '../../../../utils/alert-box';

@Component({
  selector: 'app-add-edit-questions',
  templateUrl: './add-edit-questions.component.html',
  styleUrls: ['./add-edit-questions.component.css']
})
export class AddEditQuestionsComponent implements OnInit {
  public questionAnswerForm: FormGroup;
  public questionId: number;
  public modalTitle = '';
  public isLoading: boolean;
  public readonly: boolean;

  constructor(
    private router: Router,
    private alert: AlertBox,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private observables: ObservablesService,
    public dialogRef: MatDialogRef<AddEditQuestionsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.questionId = data.id;
    if (data.action !== 'View'){
      this.modalTitle = data.action;
      this.readonly = false;
    } else {
      this.modalTitle = '';
      this.readonly = true;
    }

    if (data.action !== 'Add'){
      this.getQuestionOptions();
    }
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.observables.changeFormValid(false);
    this.questionAnswerForm = this.formBuilder.group({
      question: [{value: '', disabled: this.readonly}, [Validators.required]],
      option1: [{value: '', disabled: this.readonly}, [Validators.required]],
      option2: [{value: '', disabled: this.readonly}, [Validators.required]],
      option3: [{value: '', disabled: this.readonly}, [Validators.required]],
    });
  }

  public close(result): void{
    this.dialogRef.close({ event: result });
  }

  public getQuestionOptions(): any{
    const url = 'admin/viewSingleQuestions';
    const data = {
      id: this.questionId
    };
    this.apiService.doPostRequest(url, data).subscribe(
      (returndata: any) => {
        if (returndata){
          this.questionAnswerForm.patchValue({
            question: returndata.question,
            option1: returndata.options[0].answerText,
            option2: returndata.options[1].answerText,
            option3: returndata.options[2].answerText
           });
        }
        console.log(returndata);
      },
      (error) => {
        this.close('cancel');
        this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
      }
    );
  }

  public doAddEditQA(): void{
    if (this.questionAnswerForm.invalid) {
      this.observables.changeFormValid(true);
      return;
    } else {
      (document.querySelector('.action') as HTMLInputElement).setAttribute('disabled', '');
    }

    let url = '';
    let data;
    if (this.modalTitle === 'Add'){
      url = 'admin/questions';
      data = {
        question: this.questionAnswerForm.value.question,
        options: [
            { id: 1, answerText: this.questionAnswerForm.value.option1 },
            { id: 2, answerText: this.questionAnswerForm.value.option2 },
            { id: 3, answerText: this.questionAnswerForm.value.option3 }
        ]
      };
    } else {
      url = 'admin/updateQuestion';
      data = {
        id: this.questionId,
        question: this.questionAnswerForm.value.question,
        options: [
            { id: 1, answerText: this.questionAnswerForm.value.option1 },
            { id: 2, answerText: this.questionAnswerForm.value.option2 },
            { id: 3, answerText: this.questionAnswerForm.value.option3 }
        ]
      };
    }

    this.apiService.doPostRequest(url, data).subscribe(
      (returndata: any) => {
        console.log(returndata);
        if (returndata){
          this.close('success');
          this.alert.success('Success!', 'Question and Options added successfully');
        }
      },
      (error) => {
        (document.querySelector('.action') as HTMLInputElement).removeAttribute('disabled');
        this.close('cancel');
        this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
      }
    );


    
  }

}
