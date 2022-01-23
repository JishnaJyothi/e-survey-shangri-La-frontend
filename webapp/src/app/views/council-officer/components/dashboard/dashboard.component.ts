import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog: MatDialog,
    private alert: AlertBox,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.name = this.apiService.userName;
    this.getAllQuestions();
  }

  public getAllQuestions(): void{
    const url = 'admin/viewQuestions';
    this.apiService.doGetRequest(url).subscribe(
      (returndata: any) => {
        this.questions = returndata;
      },
      (error) => {
        console.log(error);
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
      if (result.event === 'success'){
        this.getAllQuestions();
      }
    });
  }

  public deleteQuestion(qid: any): any {
    const url = 'admin/removeQuestion';
    const data = {
      id: qid
    };

    this.apiService.doDeleteRequest(url, data).subscribe(
      (returndata: any) => {
        this.questions = returndata;
        console.log(returndata);
      },
      (error) => {
        console.log(error);
        this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
      }
    );
  }

  public logout(): void{
    const data = {
      userid: this.apiService.userId
    };

    this.apiService.doLogout(data).subscribe(
      (returndata: any) => {
        console.log(returndata);
      },
      (error) => {
        console.log(error);
        this.alert.error('Error!', 'Internal Server Error, Unable to process the request. Please try again later!');
      }
    );
  }
  
}

