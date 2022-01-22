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
  public registerForm: FormGroup;
public questionId: number;
public modalTitle: string;
public isLoading: boolean;

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
    this.modalTitle = data.action;
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.observables.changeFormValid(false);
    this.registerForm = this.formBuilder.group({
      question: ['', [Validators.required]],
      option1: ['', [Validators.required]],
      option2: ['', [Validators.required]],
      option3: ['', [Validators.required]],
    });
  }

  public close(): void{
    this.dialogRef.close({ event: 'cancel' });
  }

  public doAddEditQA(): void{
    
  }

}
