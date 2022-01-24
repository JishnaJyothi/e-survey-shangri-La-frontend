import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// services
import { ApiService } from '../../../../services/api.service';
// Alerts
import { AlertBox } from '../../../../utils/alert-box';
// import { AddCouponsComponent } from '../../modals/add-coupons/add-coupons.component'
import { AddEditQuestionsComponent } from '../../modals/add-edit-questions/add-edit-questions.component'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public name: string;
  public isLoading = false;
  public questionIndex: number;
  public questions = [];

  public options = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private alert: AlertBox,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.name = this.apiService.userName;
    this.getAllQuestions();
  }

  public getAllQuestions(): void{
    const url = 'admin/getAllQuestions';
    this.apiService.doGetRequest(url).subscribe(
      (returndata: any) => {
        this.questions = returndata;
      },
      (error) => {
        //console.log(error);
        this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
      }
    );
  }

  public openAddEditQuestionOptions(i: any, qsaction: string): void {
    const dialogRef = this.dialog.open(AddEditQuestionsComponent, {
      data: {
        id: i,
        action: qsaction,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      if (result.event === 'success'){
        this.getAllQuestions();
      }
    }
    });
  }

  public deleteQuestion(qid: any): any {
    const url = 'admin/removeQuestion/' + qid;
    
    this.apiService.doDeleteRequest(url).subscribe(
      (returndata: any) => {
        this.getAllQuestions();
        this.alert.success('Success!', returndata.message);
      },
      (error) => {
        //console.log(error);
        this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
      }
    );
  }

  public logout(): void{
    this.apiService.doLogout().subscribe(
      (returndata: any) => {
        if (returndata){
          this.router.navigate(['/login']);
          this.alert.success('Success!', 'You have successfully Logged Out, Come back again');
        }
      },
      (error) => {
        //console.log(error);
        this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
      }
    );
  }
  
}

